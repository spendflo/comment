#!/usr/bin/env -S node --enable-source-maps

// scripts/combine-old-database-migrations.ts
import * as child_process2 from "child_process";
import { promises as fs } from "fs";
import "dotenv/config.js";
import pg from "pg";
import prettier from "prettier";
import yargs from "yargs";

// database/tooling/migra.ts
import * as path from "path";

// database/tooling/utils.ts
import * as child_process from "child_process";
import { v4 as uuid } from "uuid";
function makePgEnv(override = {}) {
  const { PGDATABASE: _, ...env2 } = process.env;
  return {
    ...env2,
    PGHOST: process.env.POSTGRES_HOST,
    PGPORT: process.env.POSTGRES_PORT,
    PGUSER: process.env.POSTGRES_USER,
    PGPASSWORD: process.env.POSTGRES_PASSWORD,
    ...override
  };
}
async function withTemporaryDatabase(callback) {
  const env2 = makePgEnv();
  const dbname = `temp-${uuid()}`;
  console.log(`Creating temporary database: ${dbname}`);
  await run("createdb", ["--template=template_radical_db", dbname], { env: env2 });
  const clientConfig = {
    user: env2.PGUSER,
    password: env2.PGPASSWORD,
    host: env2.PGHOST,
    port: Number(env2.PGPORT) || void 0,
    database: dbname
  };
  try {
    return await callback(dbname, clientConfig, { ...env2, PGDATABASE: dbname });
  } finally {
    console.log(`Destroying temporary database: ${dbname}`);
    await run("dropdb", ["--if-exists", dbname], { env: env2 });
  }
}
function run(cmd, args, env2) {
  return new Promise((resolve2, reject) => {
    child_process.execFile(cmd, args, env2 ?? {}, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      } else {
        resolve2(stdout);
      }
    });
  });
}

// database/tooling/migra.ts
var venvPath = path.resolve(process.cwd(), "tmp", "migra.python-venv");
var venvBinPath = path.resolve(venvPath, "bin");
var migraPath = path.resolve(venvBinPath, "migra");
var env = makePgEnv();
var venvEnv = makePgEnv({ PATH: `${venvBinPath}:${process.env.PATH}` });
function runSequelizeMigrate(database, ...extraArgs) {
  return run(
    "npx",
    ["sequelize-cli", "db:migrate", "--env", "pgenv", ...extraArgs || []],
    {
      env: { ...env, PGDATABASE: database }
    }
  );
}

// scripts/combine-old-database-migrations.ts
async function main() {
  const { to: toMigration } = yargs(process.argv.slice(2)).option("to", {
    type: "string",
    demandOption: true,
    description: "name of the migration up to which you want combine migrations together. This is a migration file name without the database/migrations/ prefix but with the .js extension."
  }).help().argv;
  await fs.access(`database/migrations/${toMigration}`);
  await withTemporaryDatabase(async (database, clientConfig, env2) => {
    await runSequelizeMigrate(database, "--to", toMigration);
    const client = new pg.Client(clientConfig);
    await client.connect();
    let migrationNames;
    try {
      migrationNames = (await client.query(
        'SELECT name FROM public."SequelizeMeta" ORDER BY name;'
      )).rows.map(({ name }) => name);
    } finally {
      await client.end();
    }
    if (!migrationNames.length) {
      throw new Error("No migrations!");
    }
    const match = /^\d+/.exec(toMigration);
    if (!match) {
      throw new Error(`Migration name must begin with a number`);
    }
    const newMigrationPath = `database/migrations/${BigInt(match[0]) + BigInt(1)}-cord-schema.cjs`;
    const dump = await spawn2(
      "pg_dump",
      [
        "--no-owner",
        "--no-acl",
        "--schema=cord",
        "--inserts",
        "--rows-per-insert=100"
      ],
      env2
    );
    const migration = `'use strict';
    
    module.exports = {
        up: ({ sequelize }) => sequelize.transaction(
            { isolationLevel: 'SERIALIZABLE' },
            async (transaction) => {
                const names = new Set((await sequelize.query(
                    'SELECT name FROM public."SequelizeMeta";',
                    { type: 'SELECT', transaction },
                )).map(({ name }) => name));

                if (originalMigrationNames.every(n => !names.has(n))) {
                    // No original migrations have been applied
                    await sequelize.query(dump + setup, { transaction });
                } else if (originalMigrationNames.every(n => names.has(n))) {
                    // All original migrations have been applied before
                    await sequelize.query(
                        'DELETE FROM public."SequelizeMeta" WHERE name=ANY($1);',
                        { bind: [originalMigrationNames], transaction }
                    );
                } else {
                    throw new Error('Some but not all original migrations have been applied');
                }
            },
        ),
        down: ({ sequelize }) =>
            sequelize.query(\`
                DROP SCHEMA IF EXISTS "cord" CASCADE;
                DROP FUNCTION IF EXISTS public.gen_random_uuid();
            \`),
    };

    const originalMigrationNames = ${JSON.stringify(migrationNames)};

    const dump = ${multiLineStringLiteral(removeCommentsAndBlankLines(dump))};
    const setup = ${multiLineStringLiteral(setup)};
    `;
    const formattedMigration = await prettier.format(migration, {
      filepath: newMigrationPath,
      ...await prettier.resolveConfig(newMigrationPath)
    });
    for (const name of migrationNames) {
      await fs.unlink(`database/migrations/${name}`);
    }
    await fs.writeFile(newMigrationPath, formattedMigration);
  });
}
var setup = `
CREATE OR REPLACE FUNCTION public.gen_random_uuid()
RETURNS uuid AS 'SELECT uuid_generate_v4();' LANGUAGE SQL;

SET search_path = cord, public;`;
function spawn2(command, args, env2) {
  return new Promise((resolve2, reject) => {
    const proc = child_process2.spawn(command, args, {
      stdio: ["ignore", "pipe", "inherit"],
      env: env2
    });
    let stdout = "";
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (code === 0) {
        resolve2(stdout);
      } else {
        reject(new Error(`Child process exited with status ${code}`));
      }
    });
    proc.stdout.on("data", (data) => {
      stdout += data;
    });
  });
}
function multiLineStringLiteral(s) {
  return `\`${s.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${")}\``;
}
function removeCommentsAndBlankLines(sql) {
  sql = sql.replace(
    /("(""|[^"])*")|('(''|[^'])*')|(--[^\n]*\n*)|(\n\n+)/gm,
    (match) => {
      if (match[0] === '"' && match[match.length - 1] === '"' || match[0] === "'" && match[match.length - 1] === "'") {
        return match;
      } else if (match[0] === "\n") {
        return "\n";
      } else if (match.startsWith("--")) {
        return "";
      } else {
        throw new Error("Logic error");
      }
    }
  );
  return sql;
}
main().then(
  () => {
    process.exit(0);
  },
  (err) => {
    console.error("\n");
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=combine-old-database-migrations.js.map
