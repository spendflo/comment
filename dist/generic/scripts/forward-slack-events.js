#!/usr/bin/env -S node --enable-source-maps

// scripts/forward-slack-events.ts
import "dotenv/config.js";
import * as querystring from "querystring";
import WebSocket from "ws";
import yargs from "yargs";

// server/src/const.ts
var SLACK_EVENTS_WEBSOCKET_ENDPOINT = "/slackEvents";
var SLACK_EVENT_PATH = "/slack/event";
var SLACK_INTERACTIVE_EVENT_PATH = "/slack/interactiveEvent";
var SLACK_INTERNAL_EVENT_PATH = "/slack/internal/event";
var SLACK_INTERNAL_INTERACTIVE_EVENT_PATH = "/slack/internal/interactiveEvent";

// scripts/lib/auth.ts
import * as https from "https";
import * as path from "path";
import * as url from "url";
import { readFileSync } from "fs";
import express from "express";
import * as jwt from "jsonwebtoken";
import open from "open";

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

// scripts/lib/auth.ts
var PORT = 7349;
async function fetchAuthToken(tier = "prod") {
  const endpoint = `https://admin${tier !== "prod" ? ".staging" : ""}.cord.com/auth-token`;
  const endpointUrl = new URL(endpoint);
  endpointUrl.searchParams.set(
    "token",
    jwt.sign(
      { redirect: `https://local.cord.com:${PORT}/__auth` },
      Env_default.ADMIN_TOKEN_SECRET
    )
  );
  const authTokenPromise = listen();
  void open(endpointUrl.href, { background: true });
  return await authTokenPromise;
}
function listen() {
  return new Promise((resolve) => {
    const app = express();
    app.get("/__auth", (req, res) => {
      const token = typeof req.query.token === "string" && req.query.token;
      if (!token) {
        res.status(400).send("Invalid token").end();
        resolve(null);
        return;
      }
      resolve(token);
      res.status(200).contentType("text/html").send(
        `<!DOCTYPE html><html><body><script>window.close();</script></body>`
      );
    });
    const server = https.createServer(
      {
        key: readFileSync(
          path.dirname(url.fileURLToPath(import.meta.url)) + "/../../localhost/localhost.key"
        ),
        cert: readFileSync(
          path.dirname(url.fileURLToPath(import.meta.url)) + "/../../localhost/localhost.crt"
        )
      },
      app
    );
    server.listen(PORT);
  });
}

// scripts/forward-slack-events.ts
var argv = yargs(process.argv.slice(2)).option("wsUrl", {
  type: "string",
  description: "url of the websocket to connect to",
  default: `wss://admin.staging.cord.com${SLACK_EVENTS_WEBSOCKET_ENDPOINT}`
}).option("postUrl", {
  type: "string",
  description: "url the websocket forwards standard slack events to",
  default: `https://localhost:8161${SLACK_EVENT_PATH}`
}).option("iPostUrl", {
  type: "string",
  description: "url the websocket forwards custom interactive events to",
  default: `https://localhost:8161${SLACK_INTERACTIVE_EVENT_PATH}`
}).option("internalPostUrl", {
  type: "string",
  description: "url the websocket forwards internal events to",
  default: `https://localhost:8123${SLACK_INTERNAL_EVENT_PATH}`
}).option("internalIPostUrl", {
  type: "string",
  description: "url the websocket forwards internal interactive events to",
  default: `https://localhost:8123${SLACK_INTERNAL_INTERACTIVE_EVENT_PATH}`
}).option("auth", {
  type: "string",
  description: "Authorization token of an admin user in staging",
  default: ""
}).strict().help().alias("help", "h").argv;
var { wsUrl, postUrl, iPostUrl, internalPostUrl, internalIPostUrl, auth } = argv;
async function main() {
  const ws = new WebSocket(wsUrl, {
    headers: { Authorization: await authToken(auth) }
  });
  const wsClosed = new Promise((res) => ws.on("close", res));
  ws.on("open", () => {
    console.log("Websocket connection opened");
    setInterval(() => {
      ws.ping();
    }, 55e3);
  });
  ws.on("message", (msg) => {
    console.log(`Forwarding message:
${msg}

`);
    const message = Buffer.isBuffer(msg) ? msg.toString() : msg;
    const parsed = JSON.parse(message);
    if (parsed.type === "standard") {
      fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(parsed.event),
        headers: { "Content-type": "application/json" }
      }).catch(console.error);
    } else if (parsed.type === "interactive") {
      fetch(iPostUrl, {
        method: "POST",
        body: querystring.stringify(parsed.event),
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      }).catch(console.error);
    } else if (parsed.type === "internal") {
      fetch(internalPostUrl, {
        method: "POST",
        body: JSON.stringify(parsed.event),
        headers: { "Content-type": "application/json" }
      }).catch(console.error);
    } else if (parsed.type === "internal-interactive") {
      fetch(internalIPostUrl, {
        method: "POST",
        body: querystring.stringify(parsed.event),
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      }).catch(console.error);
    } else {
      console.log("Failed to determine Slack event type");
    }
  });
  await wsClosed;
  console.log("Websocket connection closed");
}
async function authToken(token) {
  if (token === "") {
    return "Bearer " + await fetchAuthToken("staging");
  } else if (token.startsWith("Bearer ")) {
    return token;
  } else {
    return `Bearer ${token}`;
  }
}
main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=forward-slack-events.js.map