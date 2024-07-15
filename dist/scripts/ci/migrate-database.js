#!/usr/bin/env -S node --enable-source-maps

// scripts/ci/migrate-database.ts
import { performance } from "perf_hooks";
import "dotenv/config.js";

// scripts/lib/migrate_db.mjs
import {
  getMigrator,
  ensureCurrentMetaSchema
} from "sequelize-cli/lib/core/migrator.js";
import api from "sequelize-cli/lib/helpers/config-helper.js";
async function getPendingMigrations() {
  await api.init();
  const migrator = await getMigrator("migration", {});
  ensureCurrentMetaSchema(migrator);
  return (await migrator.pending()).map(({ file }) => file);
}

// scripts/ci/lib/helpers.ts
import * as child_process from "child_process";
import * as Slack from "@slack/web-api";
import pg from "pg";

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

// scripts/ci/migrate-database.ts
async function main() {
  const postErrorMessage = await postMessageFactory(
    Env_default.CORD_OPS_SLACK_CHANNEL_ID
  );
  const postInfoMessage = await postMessageFactory(
    Env_default.PROD_CHANGES_SLACK_CHANNEL_ID
  );
  try {
    console.log("Check if migration is pending");
    const pendingMigrations = await getPendingMigrations();
    const migrationNeeded = pendingMigrations.length > 0;
    if (!migrationNeeded) {
      console.log("\n\nNo database migration required");
      return 0;
    }
    const migrationsSuffix = `

\u2022 ${pendingMigrations.join("\n\u2022 ")}`;
    console.log("\n\nStarting a database migration");
    await postInfoMessage("Starting a database migration:" + migrationsSuffix);
    const migrationStartTime = performance.now();
    const timeoutID = setInterval(() => {
      void postErrorMessage(
        `Database migration still has not finished after ${Math.round(
          (performance.now() - migrationStartTime) / 1e3
        )} seconds`
      );
    }, 30 * 1e3);
    const exitCode = await runCommandLine("npm", ["run", "migrate"]).finally(
      () => clearInterval(timeoutID)
    );
    if (exitCode === 0) {
      const completionMessage = "Successfully completed database migrations:" + migrationsSuffix;
      await postInfoMessage(completionMessage);
    } else {
      throw new Error(
        `'npm run migrate' failed (process exit code: ${exitCode})`
      );
    }
  } catch (err) {
    await postErrorMessage(`Database migration failed: ${err}`);
    throw err;
  }
  return 0;
}
main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=migrate-database.js.map
