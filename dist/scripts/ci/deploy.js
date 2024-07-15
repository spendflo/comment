#!/usr/bin/env -S node --enable-source-maps

// scripts/ci/deploy.ts
import { inspect, promisify } from "util";
import "dotenv/config.js";
import * as fs from "fs/promises";
import * as zlib from "zlib";
import * as autoscaling from "@aws-sdk/client-auto-scaling";
import * as cloudfront from "@aws-sdk/client-cloudfront";
import * as ec2 from "@aws-sdk/client-ec2";
import * as ecr from "@aws-sdk/client-ecr";
import * as elbv2 from "@aws-sdk/client-elastic-load-balancing-v2";
import Docker from "dockerode";
import { decode } from "js-base64";
import yargs from "yargs";

// ops/aws/src/radical-stack/Config.ts
var AWS_REGION = "eu-west-2";

// server/src/config/MagicEnv.ts
var RequiredVariable = class {
  constructor() {
    this.req = true;
  }
};
var OptionalVariable = class {
  constructor() {
    this.opt = true;
  }
};
var VariableWithDefaultValue = class {
  constructor(defaultValue2) {
    this.defaultValue = defaultValue2;
  }
};
var required = new RequiredVariable();
var optional = new OptionalVariable();
var defaultValue = (defaultValue2) => new VariableWithDefaultValue(defaultValue2);
function magicEnv(processEnv, envDefinition) {
  const env = {};
  for (const key of Object.keys(envDefinition)) {
    const value = processEnv[key];
    const fieldDefinition = envDefinition[key];
    if (fieldDefinition.req) {
      if (value === void 0) {
        throw new Error(`Missing key ${key} in environment`);
      } else {
        env[key] = value;
      }
    } else if (fieldDefinition.opt) {
      env[key] = value;
    } else {
      if (value === void 0) {
        env[key] = fieldDefinition.defaultValue;
      } else {
        env[key] = value;
      }
    }
  }
  return env;
}

// server/src/config/Env.ts
var Env_default = magicEnv(process.env, {
  // `process.env.NODE_ENV` is used in our code, but also in many third party
  // libraries we import, to switch between development and production mode.
  // Just to make sure it is set in the process environment, we include it here.
  NODE_ENV: required,
  // Normally one of `prod`, `staging`, `dev`, `test`, or `loadtest`
  CORD_TIER: required,
  // Accept connections on these ports
  API_SERVER_PORT: optional,
  ADMIN_SERVER_PORT: optional,
  METRICS_SERVER_PORT: optional,
  STATUS_SERVER_PORT: optional,
  CONSOLE_SERVER_PORT: optional,
  DOCS_SERVER_PORT: optional,
  // PostgreSQL connection configuration - required
  POSTGRES_HOST: required,
  POSTGRES_PORT: required,
  POSTGRES_USER: required,
  POSTGRES_PASSWORD: required,
  POSTGRES_DB: required,
  // PostgreSQL read-only server, if there is one (user/password/db setting same
  // as above)
  POSTGRES_READ_HOST: optional,
  POSTGRES_READ_PORT: optional,
  // Redis connection configuration
  REDIS_PORT: required,
  REDIS_HOST: required,
  PREDIS_PORT: required,
  PREDIS_HOST: required,
  // URLs pointing to our own endpoints
  TOP_SERVER_HOST: required,
  APP_SERVER_HOST: required,
  API_SERVER_HOST: required,
  API_SERVER_HOST_PRODUCTION: required,
  ADMIN_SERVER_HOST: required,
  MARKETING_SERVER_HOST: required,
  PUBLIC_UPLOADS_HOST: required,
  CONSOLE_SERVER_HOST: required,
  CORD_TO_HOST: required,
  DOCS_SERVER_HOST: required,
  CLACK_SERVER_HOST: optional,
  COMMUNITY_SERVER_HOST: required,
  // Slack App credentials - required
  SLACK_APP_CLIENT_SECRET: required,
  SLACK_DEV_APP_CLIENT_SECRET: required,
  SLACK_ADMIN_LOGIN_REDIRECT_HOST: optional,
  SLACK_APP_REDIRECT_HOST: optional,
  SLACK_SIGNING_SECRET: required,
  SLACK_ADMIN_CLIENT_SECRET: required,
  SLACK_ADMIN_SIGNING_SECRET: required,
  SLACK_INTERNAL_BOT_TOKEN: required,
  SLACK_INTERNAL_SIGNING_SECRET: required,
  SLACK_CUSTOMER_UPDATES_BOT_TOKEN: required,
  // S3 Bucket File storage
  S3_ACCESS_KEY_ID: optional,
  S3_ACCESS_KEY_SECRET: optional,
  S3_REGION: required,
  S3_BUCKET: required,
  S3_PUBLIC_BUCKET: required,
  S3_ENDPOINT: required,
  S3_USE_PATH_BASED_URLS: required,
  EMAIL_LINKS_TOKEN_SECRET: required,
  // Jira App credentials - required
  JIRA_APP_CLIENT_ID: required,
  JIRA_APP_CLIENT_SECRET: required,
  // Asana App credentials - required
  ASANA_APP_CLIENT_ID: required,
  ASANA_APP_CLIENT_SECRET: required,
  // Linear App credentials - required
  LINEAR_APP_CLIENT_ID: required,
  LINEAR_APP_CLIENT_SECRET: required,
  // Trello App credentials - required
  TRELLO_APP_CLIENT_ID: required,
  TRELLO_APP_CLIENT_SECRET: required,
  // Monday App credentials - required
  MONDAY_APP_CLIENT_ID: required,
  MONDAY_APP_CLIENT_SECRET: required,
  // Secret for session tokens - required
  JWT_SIGNING_SECRET: required,
  // Secret for signing OAuth flow state variables encoding the user and org IDs
  OAUTH_STATE_SIGNING_SECRET: required,
  // Secret for signing Slack OAuth flow state variables encoding the user and org IDs
  SLACK_OAUTH_STATE_SIGNING_SECRET: required,
  // Log level for console logging - optional ('info' if not provided)
  LOGLEVEL: defaultValue("info"),
  // Post error messages to this Slack channel,
  CORD_OPS_SLACK_CHANNEL_ID: optional,
  // Post informational changes to prod setup, including deploy and db migration
  // messages, to this Slack channel
  PROD_CHANGES_SLACK_CHANNEL_ID: optional,
  // Post security/SOC2 compliance messages to this Slack channel,
  CORD_SECURITY_SLACK_CHANNEL_ID: optional,
  // Post info about go redirects to this Slack channel
  CORD_GO_REDIRECTS_SLACK_CHANNEL_ID: optional,
  // Post messages from customers to this Slack channel
  CORD_ALL_CUSTOMERS_SLACK_CHANNEL_ID: optional,
  // Post client request messages to this Slack channel
  CORD_CLIENT_REQUESTS_SLACK_CHANNEL_ID: optional,
  // For sending search queries from the docs site to Slack
  CORD_DOCS_SEARCH_SLACK_CHANNEL_ID: optional,
  // Cloudwatch config - optional. If these are not provided, Cloudwatch
  // logging is disabled
  CLOUDWATCH_LOGLEVEL: optional,
  CLOUDWATCH_AWS_REGION: defaultValue("eu-west-2"),
  // our default region, London
  CLOUDWATCH_LOG_GROUP_NAME: optional,
  CLOUDWATCH_LOG_STREAM_NAME: optional,
  // Host used when developing locally but an externally accessible url is
  // needed. (example: d92dd1d1fa99.ngrok.io)
  EXTERNAL_API_HOST_FOR_DEVELOPMENT: optional,
  // path to static files for the admin app
  ADMIN_SERVER_STATIC_PATH: defaultValue("dist/server/admin"),
  // path to static files for the console app
  CONSOLE_SERVER_STATIC_PATH: defaultValue("dist/server/console"),
  // path to static files for the docs app
  DOCS_SERVER_STATIC_PATH: defaultValue("dist/docs/static"),
  // API key used to send transactional email notifications through Sendgrid.
  SENDGRID_API_KEY: required,
  // HTTP Basic Auth name and password for SendGrid's Inbound Parse webhooks
  SENDGRID_INBOUND_WEBHOOK_USER: required,
  SENDGRID_INBOUND_WEBHOOK_PASSWORD: required,
  // API key used to fetch feature flags from LaunchDarkly
  LAUNCHDARKLY_API_KEY: optional,
  // Number of extra workers to run the api server in: 'auto' makes one per CPU; otherwise a specific number can be used
  NUM_WORKERS: optional,
  // Encryption key used when storing secrets in the database
  PLATFORM_SECRETS_ENCRYPTION_KEY: required,
  // Encryption key used when generating file permalinks
  FILE_PROXY_SIGNING_SECRET_KEY: required,
  // sentry.io environment setting
  SENTRY_ENVIRONMENT: optional,
  SENTRY_RELEASE: optional,
  SENTRY_TRACE_SAMPLE_RATE: optional,
  // Auth0 Environment variables
  // 1) For SPA application
  AUTH0_CLIENT_ID: required,
  AUTH0_CUSTOM_LOGIN_DOMAIN: required,
  // 2) For verifying incoming events
  AUTH0_WEBHOOK_SECRET: required,
  // 3) For server to server communication
  AUTH0_MTM_CLIENT_ID: required,
  AUTH0_MTM_CLIENT_SECRET: required,
  AUTH0_GENERAL_DOMAIN: required,
  // console.cord.com cord app credentials
  DEV_CONSOLE_CORD_APP_SECRET: required,
  // secret for signing admin tokens to serve as proof user is logged in to
  // admin
  ADMIN_TOKEN_SECRET: required,
  // flag whether the SDK testbed should be built and served
  INCLUDE_SDK_TESTBED: optional,
  // secret for cookies on the docs web site
  DOCS_COOKIE_PARSER_SECRET: optional,
  // set email for all notifications when testing with users on testbed
  TESTBED_USERS_EMAIL: optional,
  // secret for creating searchable embeddings and generating search
  // results within our docs
  OPENAI_API_SECRET: required,
  // secret for getting geographic information from an IP address
  IPSTACK_API_SECRET: optional,
  // Host for where we generate the ai chat bot in the docs
  DOCS_AI_CHATBOT_SERVER_HOST: required,
  // Google analytic events
  GA_MEASUREMENT_ID: required,
  GA_MEASUREMENT_PROTOCOL_API_SECRET: required,
  // secret for stripe
  STRIPE_SECRET_KEY: required,
  STRIPE_WEBHOOK_SECRET_KEY: required,
  DEMO_APPS_SHARED_SECRET: required,
  // loops.so for sending newletters
  LOOPS_SO_API_KEY: required
});

// scripts/ci/lib/helpers.ts
import * as child_process from "child_process";
import * as Slack from "@slack/web-api";
import pg from "pg";

// common/util/sleep.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// scripts/ci/lib/helpers.ts
function runCommandLine(cmd, args, options = {}, stdin) {
  console.log(`Executing command:
  ${cmd} ${args.join(" ")}
`);
  return new Promise((resolve, reject) => {
    const proc = child_process.spawn(cmd, args, {
      stdio: [stdin === void 0 ? "ignore" : "pipe", "inherit", "inherit"],
      ...options
    });
    if (stdin !== void 0 && proc.stdin) {
      const stream = proc.stdin;
      stream.write(stdin, "utf-8", () => stream.end());
    }
    proc.on("error", reject);
    proc.once("close", (code) => resolve(code));
  });
}
async function connectToDatabase() {
  const clientConfig = {
    user: Env_default.POSTGRES_USER,
    host: Env_default.POSTGRES_HOST,
    database: Env_default.POSTGRES_DB,
    password: Env_default.POSTGRES_PASSWORD,
    port: Env_default.POSTGRES_PORT !== void 0 ? Number(Env_default.POSTGRES_PORT) : void 0
  };
  const client = new pg.Client(clientConfig);
  await client.connect();
  return client;
}
async function postMessageFactory(slackChannelID) {
  if (slackChannelID) {
    try {
      const token = Env_default.SLACK_INTERNAL_BOT_TOKEN;
      let prefix = "";
      const {
        GITHUB_REPOSITORY,
        GITHUB_RUN_ID,
        GITHUB_RUN_NUMBER,
        GITHUB_SERVER_URL
      } = process.env;
      if (GITHUB_REPOSITORY && GITHUB_RUN_ID && GITHUB_RUN_NUMBER && GITHUB_SERVER_URL) {
        prefix = `[<${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}|#${GITHUB_RUN_NUMBER}>] `;
      }
      const slackClient = new Slack.WebClient(token);
      return async (text) => {
        try {
          await slackClient.chat.postMessage({
            channel: slackChannelID,
            text: prefix + text
          });
        } catch (err) {
          console.error(`Error posting message to Slack: ${text}`, err);
        }
      };
    } catch (err) {
      console.error("Cannot post messages to Slack:", err);
    }
  }
  return (text) => {
    console.log(text);
    return Promise.resolve();
  };
}
var sleepSeconds = (seconds) => sleep(seconds * 1e3);

// scripts/ci/deploy.ts
function log(...stuff) {
  const ts = (/* @__PURE__ */ new Date()).toISOString();
  console.log(`[${ts}]`, ...stuff);
}
function logError(...stuff) {
  log("ERROR:", ...stuff);
}
var CONFIG = {
  prod: {
    targetGroups: {
      api: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/prodServerAPITargetGroup/372ac2f0bcb95756",
      console: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/prodServerConsoleTargetGroup/4ba4279d4c45284b",
      docs: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/prodServerDocsTargetGroup/f993310fd5f1062e",
      admin: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/prodServerAdminTargetGroup/7f29f18a9aa7f7f2"
    },
    cloudFrontDistributionID: "E2P1Z0TBFUA575"
  },
  staging: {
    targetGroups: {
      api: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/stagingServerAPITargetGroup/8819231831fc0427",
      console: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/stagingServerConsoleTargetGroup/0fab9fe8f850d0ac",
      docs: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/stagingServerDocsTargetGroup/562c2760e4255468",
      admin: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/stagingServerAdminTargetGroup/dde44005f9f01b4c"
    },
    cloudFrontDistributionID: "E2EZOYZW0TRYBC"
  },
  loadtest: {
    targetGroups: {
      api: "arn:aws:elasticloadbalancing:eu-west-2:869934154475:targetgroup/loadtestServerAPITargetGroup/7c337619a9e59828"
    },
    cloudFrontDistributionID: "E32RS03NTNGW0X"
  }
};
var argv = yargs(process.argv.slice(2)).option("pullImage", {
  type: "string",
  description: "Docker image to pull and deploy",
  default: "869934154475.dkr.ecr.eu-west-2.amazonaws.com/server:latest"
}).option("pushOnSuccess", {
  type: "string",
  description: "Docker tag to push after successful deploy"
}).option("force", {
  type: "boolean",
  description: 'deploy even if "automaticDeploy" is off'
}).option("unattended", {
  type: "boolean",
  description: "flag that the script is executed unattendedly (by a build plan or cron job), results in posting extra messages to Slack"
}).help().alias("help", "h").argv;
async function main() {
  const { CORD_TIER: tier } = Env_default;
  if (tier !== "staging" && tier !== "prod" && tier !== "loadtest") {
    throw new Error("tier must be prod, staging, or loadtest");
  }
  const db = await connectToDatabase();
  const opsConfig = (await db.query(
    `SELECT json_object_agg(key, value) AS config
         FROM cord.heimdall WHERE tier=$1;`,
    [tier]
  ))?.rows[0]?.config ?? {};
  const postErrorMessage = await postMessageFactory(
    Env_default.CORD_OPS_SLACK_CHANNEL_ID
  );
  const postInfoMessage = await postMessageFactory(
    Env_default.PROD_CHANGES_SLACK_CHANNEL_ID
  );
  try {
    const exitCode = await deployTier(
      tier,
      postErrorMessage,
      postInfoMessage,
      opsConfig,
      db
    );
    return exitCode;
  } catch (err) {
    await postErrorMessage(`ERROR: push to ${tier} failed with an error
\`\`\`
${inspect(err, false, 10, false)}
\`\`\``);
    throw err;
  }
}
async function deployTier(tier, postErrorMessage, postInfoMessage, opsConfig, db) {
  log(`Deploying to ${tier} tier`);
  log(`Arguments: ${JSON.stringify(argv, null, 2)}`);
  const asClient = new autoscaling.AutoScalingClient({ region: AWS_REGION });
  const ec2Client = new ec2.EC2Client({ region: AWS_REGION });
  const ecrClient = new ecr.ECRClient({ region: AWS_REGION });
  const elbv2Client = new elbv2.ElasticLoadBalancingV2Client({
    region: AWS_REGION
  });
  const localDocker = new Docker();
  const ecrAuth = await getEcrAuth(ecrClient);
  await dockerPull(localDocker, argv.pullImage, ecrAuth);
  const imageInfo = await localDocker.getImage(argv.pullImage).inspect();
  const imageName = imageInfo.RepoDigests[0] ?? argv.pullImage;
  const imageLabels = imageInfo.Config.Labels;
  const gitCommitHash = imageLabels["com.cord.git-commit-hash"];
  const gitCommitTitle = imageLabels["com.cord.git-commit-title"];
  const packageVersion = imageLabels["com.cord.version"];
  log(
    `Using Docker image ${imageName} - git commit hash ${gitCommitHash} - package version ${packageVersion}`
  );
  if (!argv.force && !opsConfig.automaticDeploy) {
    log(
      "Automatic deploys are switched off. Use '--force' to deploy nonetheless."
    );
    if (argv.unattended) {
      await postErrorMessage(`*NOT* redeploying ${tier} because automatic deployment is switched off
\u2022 Git commit: ${gitCommitHash ? `<https://github.com/getcord/monorepo/commit/${gitCommitHash}|${gitCommitHash.substr(
        0,
        10
      )}>` : "unknown"} ${gitCommitTitle || ""}
\u2022 Package version: ${packageVersion}
\u2022 Image: \`${imageName}\`
\u2022 Activate automatic deploys: https://${Env_default.ADMIN_SERVER_HOST}/heimdall
\u2022 Manual deploy: \`scripts/manual-deploy.sh ${tier} '${imageName}'\``);
    }
    return 2;
  }
  const {
    rows: [{ id: deployID }]
  } = await db.query(
    `INSERT INTO cord.deploys ("tier", "gitCommitHash", "dockerImage", "packageVersion")
     VALUES ($1,$2,$3,$4)
     RETURNING id;`,
    [tier, gitCommitHash ?? null, imageName, packageVersion ?? null]
  );
  log(`Added deploy '${deployID}' to cord.deploys table`);
  await (async () => {
    const instances = await getAutoscalingGroupInstances(
      `${tier}-server`,
      asClient,
      ec2Client
    );
    log("EC2 instances:");
    for (const i of instances) {
      log(`  * ${i.InstanceId} (${i.PrivateDnsName})`);
    }
    await Promise.all(
      instances.map(async (instance) => {
        log(`docker pull on ${instance.InstanceId}`);
        const remoteDocker = new Docker({
          host: instance.PrivateDnsName,
          port: 2375,
          protocol: "http"
        });
        log(`docker prune on ${instance.InstanceId}`);
        await remoteDocker.pruneImages({
          filters: JSON.stringify({
            until: { "3h": true },
            dangling: { false: true }
          })
        }).catch(log);
        log(`docker pull image ${imageName} on ${instance.InstanceId}`);
        await dockerPull(remoteDocker, imageName, ecrAuth);
        if (argv.pullImage !== imageName) {
          log(`docker tag ${imageName} as ${argv.pullImage}`);
          await dockerTag(remoteDocker, imageName, argv.pullImage);
        }
        log(`finished docker pull on ${instance.InstanceId}`);
      })
    );
    for (const instance of instances) {
      log(`

Instance: ${instance.InstanceId} (${instance.PrivateDnsName})`);
      let instanceHealth = (await getInstanceHealth(CONFIG[tier].targetGroups.api, elbv2Client))[instance.InstanceId];
      if (instanceHealth !== "healthy") {
        log(`Skipping - instance health is ${instanceHealth}`);
        void postErrorMessage(`During deployment to ${tier}, skipping an instance due to its health status
\`\`\`
Instance ID: ${instance.InstanceId}
Host name: ${instance.PrivateDnsName}
Health status: ${instanceHealth}
\`\`\`
`);
        continue;
      }
      for (const [name, arn] of Object.entries(CONFIG[tier].targetGroups)) {
        do {
          log(`Deregistering from load balancer ${name} target group...`);
          await elbv2Client.send(
            new elbv2.DeregisterTargetsCommand({
              TargetGroupArn: arn,
              Targets: [{ Id: instance.InstanceId }]
            })
          );
          await sleepSeconds(1);
          instanceHealth = (await getInstanceHealth(arn, elbv2Client))[instance.InstanceId];
          log(`Instance health is now: ${instanceHealth}`);
        } while (instanceHealth === "healthy");
      }
      if (process.env.ACCELERATE_DEPLOY === "true") {
        log("Skipping 30 second pause because ACCELERATE_DEPLOY is true");
      } else {
        log("Pausing for 30 seconds to help settle load balancer state");
        await sleepSeconds(30);
        log("Continuing...");
      }
      const remoteDocker = new Docker({
        host: instance.PrivateDnsName,
        port: 2375,
        protocol: "http"
      });
      try {
        await remoteDocker.getContainer("server").update({ RestartPolicy: { Name: "" } });
      } catch (err) {
        log(
          "Updating the restart policy of the existing server container failed:",
          err
        );
      }
      await drainServer(instance.PrivateDnsName);
      try {
        await remoteDocker.getContainer("server").stop();
        await remoteDocker.getContainer("server").remove();
      } catch (err) {
        log(`Could not stop/remove existing container on instance:`, err);
      }
      const container = await remoteDocker.createContainer({
        Image: imageName,
        name: "server",
        AttachStdin: false,
        AttachStdout: false,
        AttachStderr: false,
        Env: [`CORD_TIER=${tier}`],
        HostConfig: {
          NetworkMode: "host",
          RestartPolicy: { Name: "always" }
        }
      });
      await container.start();
      await waitForServerInit(instance.PrivateDnsName);
      await Promise.all(
        Object.values(CONFIG[tier].targetGroups).map(
          (arn) => elbv2Client.send(
            new elbv2.RegisterTargetsCommand({
              TargetGroupArn: arn,
              Targets: [{ Id: instance.InstanceId }]
            })
          )
        )
      );
      for (; ; ) {
        await sleepSeconds(3);
        instanceHealth = (await getInstanceHealth(CONFIG[tier].targetGroups.api, elbv2Client))[instance.InstanceId];
        log(`Instance health: ${instanceHealth}`);
        if (instanceHealth === "healthy") {
          log("Instance is back online!");
          break;
        } else if (instanceHealth !== "initial") {
          log(
            `Instance is in an unexpected state (${instanceHealth}) - moving on to next instance`
          );
          void postErrorMessage(`During deployment to ${tier}, instance in unexpected health state after server restart
\`\`\`
Instance ID: ${instance.InstanceId}
Host name: ${instance.PrivateDnsName}
Health status: ${instanceHealth}
\`\`\`
`);
          break;
        }
      }
    }
    let msg = `Redeployed ${tier}: ${gitCommitTitle || ""}${gitCommitHash ? ` (<https://github.com/getcord/monorepo/commit/${gitCommitHash}|${gitCommitHash.substr(
      0,
      10
    )}>)` : ""}
\u2022 Package version: ${packageVersion}
\u2022 Image: \`${imageName}\``;
    try {
      const compress = promisify(zlib.brotliCompress);
      const sdk = await fs.readFile(
        `dist/${tier}/external/sdk/v1/sdk.latest.js`
      );
      const compressed = await compress(sdk);
      const sdkBytes = sdk.length;
      const sdkCompressedBytes = compressed.length;
      await db.query(
        'UPDATE cord.deploys SET "sdkBytes"=$1, "sdkCompressedBytes"=$2 WHERE id=$3',
        [sdkBytes, sdkCompressedBytes, deployID]
      );
      msg += `
\u2022 SDK size: ${sdkBytes} bytes, ${sdkCompressedBytes} bytes compressed`;
    } catch (err) {
      log("Failed to estimate sdk size", err);
    }
    await postInfoMessage(msg);
    try {
      log("Upload static content to S3");
      await Promise.all([
        runCommandLine("aws", [
          "s3",
          "cp",
          "--recursive",
          "--exclude",
          "*.js",
          `dist/${tier}/external/`,
          `s3://${Env_default.APP_SERVER_HOST}/`
        ]),
        runCommandLine("aws", [
          "s3",
          "cp",
          "--recursive",
          "--exclude",
          "*",
          "--include",
          "*.js",
          "--content-type",
          "application/javascript; charset=utf-8",
          `dist/${tier}/external/`,
          `s3://${Env_default.APP_SERVER_HOST}/`
        ])
      ]).then((codes) => {
        if (codes[0] !== 0 || codes[1] !== 0) {
          throw new Error(`'aws s3 cp' failed with exit code ${codes}`);
        }
      });
    } catch (err) {
      await postErrorMessage(`Publishing assets on S3 failed with error
\`\`\`
${inspect(err, false, 10, false)}
\`\`\``);
    }
    log("Invalidate S3 CloudFront");
    try {
      await retryOnError(
        "Invalidating S3 CloudFront",
        async () => {
          const cloudfrontClient = new cloudfront.CloudFrontClient({
            region: AWS_REGION
          });
          const invalidation = await cloudfrontClient.send(
            new cloudfront.CreateInvalidationCommand({
              DistributionId: CONFIG[tier].cloudFrontDistributionID,
              InvalidationBatch: {
                Paths: { Quantity: 1, Items: ["/*"] },
                CallerReference: `deploy-${Date.now()}`
              }
            })
          );
          log(
            `Created CloudFront invalidation (id: ${invalidation.Invalidation?.Id})`
          );
        },
        {
          retries: 10,
          retryIf: (err) => err.Code === "ServiceUnavailable"
        }
      );
    } catch (err) {
      await postErrorMessage(`Invalidating S3 CloudFront failed
\`\`\`
${inspect(err, false, 10, false)}
\`\`\``);
    }
    if (argv.pushOnSuccess) {
      try {
        await dockerTag(localDocker, imageName, argv.pushOnSuccess);
        await localDocker.getImage(argv.pushOnSuccess).push({ authconfig: ecrAuth });
      } catch (err) {
        await postErrorMessage(`Updating the Docker tag '${argv.pushOnSuccess}' failed
  \`\`\`
  ${inspect(err, false, 10, false)}
  \`\`\``);
      }
    }
    await postInfoMessage("Deployment procedure finished");
  })().then(
    () => db.query(
      `UPDATE cord.deploys SET "deployFinishTime"=NOW(), success=TRUE WHERE id=$1;`,
      [deployID]
    ),
    async (error) => {
      let errorString = "";
      try {
        errorString = inspect(error);
      } catch (_) {
        errorString = `${error}`;
      }
      await db.query(
        `UPDATE cord.deploys SET "deployFinishTime"=NOW(), success=FALSE, error=$1 WHERE id=$2;`,
        [errorString, deployID]
      );
      return await Promise.reject(error);
    }
  );
  await asClient.send(
    new autoscaling.CancelInstanceRefreshCommand({
      AutoScalingGroupName: `${tier}-asyncWorker`
    })
  ).catch(
    (err) => err.Error?.Code === "ActiveInstanceRefreshNotFound" ? null : Promise.reject(err)
  );
  await asClient.send(
    new autoscaling.StartInstanceRefreshCommand({
      AutoScalingGroupName: `${tier}-asyncWorker`
    })
  );
  return 0;
}
async function getAutoscalingGroupInstances(autoScalingGroupName, asClient, ec2Client) {
  const { AutoScalingInstances: asInstances } = await asClient.send(
    new autoscaling.DescribeAutoScalingInstancesCommand({})
  );
  const instanceIDs = (asInstances ?? []).filter(
    (instance) => instance.AutoScalingGroupName === autoScalingGroupName && instance.LifecycleState === "InService"
  ).map((instance) => instance.InstanceId).filter((x) => x !== void 0);
  const response = await ec2Client.send(
    new ec2.DescribeInstancesCommand({ InstanceIds: instanceIDs })
  );
  return (response.Reservations ?? []).map((reservation) => reservation.Instances ?? []).flat().filter(({ InstanceId, PrivateDnsName }) => InstanceId && PrivateDnsName);
}
async function getEcrAuth(ecrClient) {
  const ecrAuthToken = await ecrClient.send(
    new ecr.GetAuthorizationTokenCommand({})
  );
  const token = ecrAuthToken.authorizationData?.[0].authorizationToken;
  if (!token) {
    throw new Error("Could not obtain ECR login credentials");
  }
  const f = decode(token).split(":");
  if (f.length !== 2) {
    throw new Error("Invalid ECR login credentials");
  }
  return { username: f[0], password: f[1] };
}
function dockerPull(docker, repoTag, auth) {
  return retryOnError(
    "dockerPull",
    () => new Promise(
      (resolve, reject) => docker.pull(
        repoTag,
        {},
        (err, stream) => {
          if (stream && !err) {
            let error = void 0;
            stream.on("data", (data) => {
              if (error === void 0) {
                try {
                  const parsed = JSON.parse(data.toString("utf-8"));
                  if (parsed.error) {
                    error = new Error(parsed.error);
                  }
                } catch (err2) {
                  error = err2;
                }
              }
            });
            stream.once("end", () => {
              if (error !== void 0) {
                reject(error);
              } else {
                resolve();
              }
            });
          } else {
            reject(err);
          }
        },
        auth
      )
    ),
    {
      retryIf: (err) => err.statusCode === 404
    }
  );
}
async function dockerTag(docker, existingImage, newTag) {
  const match = /^(?<repo>.*):(?<tag>.*)$/.exec(newTag);
  if (match && match.groups) {
    const { repo, tag } = match.groups;
    await docker.getImage(existingImage).tag({ repo, tag });
  }
}
async function getInstanceHealth(targetGroupArn, elbv2Client) {
  const response = await elbv2Client.send(
    new elbv2.DescribeTargetHealthCommand({
      TargetGroupArn: targetGroupArn
    })
  );
  return Object.fromEntries(
    (response.TargetHealthDescriptions ?? []).map((hd) => [hd.Target?.Id, hd.TargetHealth?.State]).filter((x) => x[0] && x[1])
  );
}
async function drainServer(hostname) {
  const port = Number(Env_default.STATUS_SERVER_PORT);
  if (!Number.isNaN(port)) {
    log("Contacting instance and requesting graceful shutdown");
    const response = await fetch(
      `http://${hostname}:${Env_default.STATUS_SERVER_PORT}/drain-and-wait`,
      {
        method: "POST",
        // Don't wait longer than one minute here!
        signal: AbortSignal.timeout(60 * 1e3)
      }
    ).catch((err) => {
      logError(err);
      return null;
    });
    if (response && response.status === 200 && await response.text() === "terminating") {
      log("Server terminated gracefully");
      return;
    }
  }
  log(`Could not trigger graceful shutdown of ${hostname} - waiting 10s`);
  await sleepSeconds(10);
}
async function waitForServerInit(hostname) {
  const port = Number(Env_default.STATUS_SERVER_PORT);
  if (Number.isNaN(port)) {
    log(
      `Server status port not configured - cannot check for initialisation - waiting 10s and hoping for the best`
    );
    return await sleepSeconds(10);
  }
  await retryOnError(
    "Wait for init",
    async () => {
      const response = await fetch(
        `http://${hostname}:${Env_default.STATUS_SERVER_PORT}/wait-for-init`,
        {
          // Once we can connect to the server, the start-up is usually super
          // quick, so we don't expect to have to wait for a long time. Don't wait
          // longer than ten seconds here!
          signal: AbortSignal.timeout(10 * 1e3)
        }
      );
      if (!(response && response.status === 200 && await response.text() === "ok")) {
        throw new Error("Received bad response from server");
      }
    },
    {
      retries: 10,
      retryDelaySeconds: 2
    }
  );
}
async function retryOnError(operationName, operation, options) {
  const opts = {
    retries: 3,
    retryIf: (_) => true,
    retryDelaySeconds: 5,
    ...options
  };
  try {
    return await operation();
  } catch (err) {
    if (opts.retries > 0 && opts.retryIf(err)) {
      log(`${operationName} failed, retrying (retries=${opts.retries})`);
      await sleepSeconds(opts.retryDelaySeconds);
      return await retryOnError(operationName, operation, {
        ...opts,
        retries: opts.retries - 1
      });
    } else {
      log(`${operationName} failed:`, inspect(err, false, 10, false));
      throw err;
    }
  }
}
main().then(
  (code) => process.exit(code),
  (err) => {
    logError(err);
    process.exit(1);
  }
);

//# sourceMappingURL=deploy.js.map
