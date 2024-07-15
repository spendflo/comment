#!/usr/bin/env -S node --enable-source-maps

// scripts/sync-opensource-repo.ts
import { promises as fs } from "fs";
import * as readline from "readline";
import { spawn } from "child_process";
import yargs from "yargs";
var EMPTY_COMMIT = "0000000000000000000000000000000000000000";
var EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
var filterOutCordPrefixedNames = (name) => !name.startsWith("CORD-");
var argv = yargs(process.argv.slice(2)).option("name", { type: "string", demandOption: true }).option("master-branch", { type: "string", default: "master" }).option("repo", { type: "string" }).strict().help().alias("help", "h").argv;
async function main(name, masterBranch, repo) {
  if (!repo) {
    repo = name;
  }
  const pathWithinMainRepo = `opensource/${name}`;
  if (!await fs.stat(pathWithinMainRepo).then((s) => s.isDirectory()).catch(() => false)) {
    throw new Error(
      `'${pathWithinMainRepo}' does not exist or is not a directory`
    );
  }
  const gitRemoteName = `opensource-${repo}`;
  if (!(await getCommandOutput("git", ["remote"])).split("\n").map((l) => l.trim()).includes(gitRemoteName)) {
    await runCommand(
      "git",
      "remote",
      "add",
      gitRemoteName,
      `git@github.com:getcord/${repo}`
    );
  }
  await runCommand("git", "fetch", gitRemoteName);
  const { monorepoCommits, subrepoCommits, monorepoTrees, subrepoTrees } = await findCommonBase(
    getMonorepoCommitsTouchingPath(pathWithinMainRepo),
    getSubrepoCommits(gitRemoteName, masterBranch)
  );
  if (monorepoCommits.length > 1) {
    console.log(
      `${monorepoCommits.length - 1} commit(s) need exporting into subrepo.`
    );
    let newBranchCommit = subrepoCommits[0];
    for (const newMonorepoCommit of monorepoCommits.slice(1)) {
      const [authorName, authorEmail, authorDate, ...lines] = (await getCommandOutput("git", [
        "log",
        "--format=%an%n%ae%n%aI%n%B",
        "-n",
        "1",
        newMonorepoCommit
      ])).trimRight().split("\n");
      newBranchCommit = (await getCommandOutput(
        "git",
        [
          "commit-tree",
          "-p",
          newBranchCommit,
          "-m",
          prepareSubrepoMessage(lines.join("\n"), newMonorepoCommit),
          monorepoTrees.get(newMonorepoCommit)
        ],
        {
          GIT_AUTHOR_NAME: authorName,
          GIT_AUTHOR_EMAIL: authorEmail,
          GIT_AUTHOR_DATE: authorDate
        }
      )).trim();
    }
    const branchName = `opensource/${repo}/export-commits`;
    await runCommand("git", "branch", "-f", branchName, newBranchCommit);
    await runCommand(
      "git",
      "branch",
      `--set-upstream-to=${gitRemoteName}/${masterBranch}`,
      branchName
    );
    console.log(`Prepared new commits in branch '${branchName}'`);
  }
  if (subrepoCommits.length > 1) {
    console.log(
      `${subrepoCommits.length - 1} commit(s) need importing from subrepo.`
    );
    const treeReplacer = await makeTreeReplacer(monorepoCommits[0], [
      "opensource",
      name
    ]);
    let newBranchCommit = monorepoCommits[0];
    for (const newSubrepoCommit of subrepoCommits.slice(1)) {
      const [authorName, authorEmail, authorDate, ...lines] = (await getCommandOutput("git", [
        "log",
        "--format=%an%n%ae%n%aI%n%B",
        "-n",
        "1",
        newSubrepoCommit
      ])).trimRight().split("\n");
      newBranchCommit = (await getCommandOutput(
        "git",
        [
          "commit-tree",
          "-p",
          newBranchCommit,
          "-m",
          lines.join("\n"),
          await treeReplacer(subrepoTrees.get(newSubrepoCommit))
        ],
        {
          GIT_AUTHOR_NAME: authorName,
          GIT_AUTHOR_EMAIL: authorEmail,
          GIT_AUTHOR_DATE: authorDate
        }
      )).trim();
    }
    const branchName = `opensource/${repo}/import-commits`;
    await runCommand("git", "branch", "-f", branchName, newBranchCommit);
    console.log(`Prepared new commits in branch '${branchName}'`);
  }
}
async function* getMonorepoCommitsTouchingPath(path) {
  let lastCommitHash = null;
  let lastTreeHash = null;
  for await (const line of streamLinesFromCommand(
    "git",
    "log",
    "--format=tformat:%H",
    "--",
    path
  )) {
    const commitHash = line.trim();
    if (commitHash) {
      const originalTreeish = `${commitHash}:${path}`;
      const filteredTreeish = await filterTreeByName(
        originalTreeish,
        filterOutCordPrefixedNames
      );
      const tree = filteredTreeish === originalTreeish ? (await getCommandOutput("git", [
        "rev-parse",
        `${commitHash}:${path}`
      ])).trim() : filteredTreeish;
      if (lastCommitHash !== null && lastTreeHash !== null && lastTreeHash !== tree) {
        yield [lastCommitHash, lastTreeHash];
      }
      lastCommitHash = commitHash;
      lastTreeHash = tree;
    }
  }
  if (lastCommitHash !== null && lastTreeHash !== null) {
    if (lastTreeHash !== EMPTY_TREE) {
      yield [lastCommitHash, lastTreeHash];
    }
    yield [`${lastCommitHash}~1`, EMPTY_TREE];
  } else {
    yield ["HEAD", EMPTY_TREE];
  }
}
async function* getSubrepoCommits(remote, branch) {
  for await (const line of streamLinesFromCommand(
    "git",
    "log",
    "--format=tformat:%H %T",
    `refs/remotes/${remote}/${branch}`
  )) {
    const fields = line.trim().split(/\s+/);
    if (fields.length === 2) {
      yield fields;
    }
  }
  yield [EMPTY_COMMIT, EMPTY_TREE];
}
async function findCommonBase(monorepoCommitIter, subrepoCommitIter) {
  const commits = [[], []];
  const treePositions = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
  const monorepoTrees = /* @__PURE__ */ new Map();
  const subrepoTrees = /* @__PURE__ */ new Map();
  for await (const [repoID, [commitID, treeID]] of zipIterators(
    monorepoCommitIter,
    subrepoCommitIter
  )) {
    (repoID === 0 ? monorepoTrees : subrepoTrees).set(commitID, treeID);
    commits[repoID].push(commitID);
    const otherRepo = 1 - repoID;
    const treeInOtherRepo = treePositions[otherRepo].get(treeID);
    if (treeInOtherRepo !== void 0) {
      commits[otherRepo] = commits[otherRepo].slice(0, treeInOtherRepo + 1);
      break;
    }
    if (!treePositions[repoID].has(treeID)) {
      treePositions[repoID].set(treeID, commits[repoID].length - 1);
    }
  }
  return {
    monorepoCommits: commits[0].reverse(),
    subrepoCommits: commits[1].reverse(),
    monorepoTrees,
    subrepoTrees
  };
}
async function makeTreeReplacer(treeish, path) {
  if (path.length === 0) {
    return (treeID) => Promise.resolve(treeID);
  }
  const path0 = path[0];
  let subtree = EMPTY_TREE;
  const lines = [];
  for await (const line of streamLinesFromCommand("git", "ls-tree", treeish)) {
    const match = /^\d+ (\w+) (\w+)\t(.*?)$/.exec(line);
    if (match) {
      const [_, type, hash, name] = match;
      if (name === path0) {
        if (type === "tree") {
          subtree = hash;
        }
      } else {
        lines.push(line);
      }
    }
  }
  const rest = lines.join("\n") + (lines.length ? "\n" : "");
  const innerReplacer = await makeTreeReplacer(subtree, path.slice(1));
  return async (treeID) => {
    const input = `${rest}040000 tree ${await innerReplacer(
      treeID
    )}	${path0}
`;
    return (await getCommandOutput("git", ["mktree"], void 0, input)).trim();
  };
}
async function filterTreeByName(treeish, func) {
  let anyChanges = false;
  const lines = [];
  for await (const line of streamLinesFromCommand("git", "ls-tree", treeish)) {
    const match = /^(\d+) (\w+) (\w+)\t(.*?)$/.exec(line);
    if (match) {
      const [_, stat, type, hash, name] = match;
      if (!func(name)) {
        anyChanges = true;
        continue;
      }
      if (type === "tree") {
        const filteredHash = await filterTreeByName(hash, func);
        if (filteredHash !== hash) {
          anyChanges = true;
          if (filteredHash !== EMPTY_TREE) {
            lines.push(`${stat} ${type} ${filteredHash}	${name}`);
          }
          continue;
        }
      }
      lines.push(line);
    }
  }
  if (anyChanges) {
    const newTreeContent = lines.join("\n") + (lines.length ? "\n" : "");
    return (await getCommandOutput("git", ["mktree"], void 0, newTreeContent)).trim();
  } else {
    return treeish;
  }
}
var privateSectionRegex = new RegExp(
  "^CORD PRIVATE SECTION START$.*?^CORD PRIVATE SECTION END(\\n|$)",
  // s = dotAll (. matches new lines)
  // m = multiline (^ and $ still match beginning and end of a line)
  // g = globally, more than one match (needed for .replaceAll())
  "smg"
);
function prepareSubrepoMessage(msg, monorepoCommitID) {
  msg = msg.replaceAll(privateSectionRegex, "");
  return `${msg.trimRight()}

monorepo-commit: ${monorepoCommitID}`;
}
function streamLinesFromCommand(cmd, ...args) {
  return readline.createInterface({
    input: spawn(cmd, args, {
      stdio: ["ignore", "pipe", process.stderr]
    }).stdout
  });
}
async function getCommandOutput(cmd, args, env, stdin) {
  const fragments = [];
  const child = spawn(cmd, args, {
    stdio: [stdin === void 0 ? "ignore" : "pipe", "pipe", process.stderr],
    env: env ? { ...process.env, ...env } : void 0
  });
  const finished = new Promise((resolve, reject) => {
    child.on("error", reject);
    child.once(
      "close",
      (code) => code === 0 ? resolve() : reject(new Error(`exit code ${code}`))
    );
  });
  if (stdin !== void 0 && child.stdin) {
    const stream = child.stdin;
    stream.write(stdin, "utf-8", () => stream.end());
  }
  if (child.stdout) {
    for await (const fragment of child.stdout) {
      fragments.push(fragment);
    }
  }
  await finished;
  return fragments.join("");
}
function runCommand(cmd, ...args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: ["ignore", "inherit", "inherit"] });
    proc.on("error", reject);
    proc.once("close", resolve);
  });
}
async function* zipIterators(...generators) {
  const gens = [...generators.entries()];
  while (gens.length) {
    const [idx, gen] = gens.shift();
    const item = await gen.next();
    if (!item.done) {
      yield [idx, item.value];
      gens.push([idx, gen]);
    }
  }
}
main(argv.name, argv["master-branch"], argv["repo"]).then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=sync-opensource-repo.js.map
