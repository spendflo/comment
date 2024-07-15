#!/usr/bin/env -S node --enable-source-maps

// scripts/call-batch-with-random-data.ts
import "dotenv/config.js";
import yargs from "yargs";
import * as jsonwebtoken from "jsonwebtoken";
import { v4 as uuid } from "uuid";

// common/const/Urls.ts
var TOP_SERVER_HOST = process.env.TOP_SERVER_HOST;
var APP_SERVER_HOST = process.env.APP_SERVER_HOST;
var API_SERVER_HOST = process.env.API_SERVER_HOST;
var API_SERVER_HOST_PRODUCTION = process.env.API_SERVER_HOST_PRODUCTION;
var ADMIN_SERVER_HOST = process.env.ADMIN_SERVER_HOST;
var CONSOLE_SERVER_HOST = process.env.CONSOLE_SERVER_HOST;
var MARKETING_SERVER_HOST = process.env.MARKETING_SERVER_HOST;
var CORD_TO_HOST = process.env.CORD_TO_HOST;
var AUTH0_CUSTOM_LOGIN_DOMAIN = process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_SERVER_HOST = process.env.DOCS_SERVER_HOST;
var SLACK_APP_REDIRECT_HOST = process.env.SLACK_APP_REDIRECT_HOST;
var TOP_ORIGIN = "https://" + process.env.TOP_SERVER_HOST;
var APP_ORIGIN = "https://" + process.env.APP_SERVER_HOST;
var API_ORIGIN = "https://" + process.env.API_SERVER_HOST;
var ADMIN_ORIGIN = "https://" + process.env.ADMIN_SERVER_HOST;
var CONSOLE_ORIGIN = "https://" + process.env.CONSOLE_SERVER_HOST;
var MARKETING_ORIGIN = "https://" + process.env.MARKETING_SERVER_HOST;
var CORD_TO_ORIGIN = "https://" + process.env.CORD_TO_HOST;
var AUTH0_ORIGIN = "https://" + process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_ORIGIN = "https://" + process.env.DOCS_SERVER_HOST;
var DOCS_AI_CHATBOT_SERVER_HOST = process.env.DOCS_AI_CHATBOT_SERVER_HOST;
var COMMUNITY_ORIGIN = "https://" + process.env.COMMUNITY_SERVER_HOST;

// common/const/Ids.ts
var CORD_APPLICATION_ID = "5a076ee9-8b9e-4156-9ac4-871bdc4569ec";
var AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
var DOCS_URLS = {
  tutorials: {
    getProductionReady: {
      addYourBranding: `${DOCS_ORIGIN}/get-started/live-css-editor`
    },
    integrationGuide: `${DOCS_ORIGIN}/get-started/integration-guide`,
    demoApps: `${DOCS_ORIGIN}/get-started/demo-apps`
  },
  components: {
    thread: `${DOCS_ORIGIN}/components/cord-thread`,
    threadList: `${DOCS_ORIGIN}/components/cord-thread-list`,
    threadedComments: `${DOCS_ORIGIN}/components/cord-threaded-comments`,
    sidebar: `${DOCS_ORIGIN}/components/cord-sidebar`,
    inbox: `${DOCS_ORIGIN}/components/cord-inbox`,
    inboxLauncher: `${DOCS_ORIGIN}/components/cord-inbox-launcher`,
    sidebarLauncher: `${DOCS_ORIGIN}/components/cord-sidebar-launcher`,
    composer: `${DOCS_ORIGIN}/components/cord-composer`,
    message: `${DOCS_ORIGIN}/components/cord-message`,
    messageContent: `${DOCS_ORIGIN}/components/cord-message-content`,
    reactions: `${DOCS_ORIGIN}/components/cord-reactions`
  },
  howTo: {
    customThreadedComments: `${DOCS_ORIGIN}/customization/custom-threaded-comments`,
    cssCustomization: `${DOCS_ORIGIN}/customization/css`,
    replacements: `${DOCS_ORIGIN}/customization/custom-react-components/tutorial`
  },
  getStarted: {
    authenticateYourUser: `${DOCS_ORIGIN}/get-started/integration-guide/generate-an-auth-token`
  },
  betaV2Components: {
    threads: `${DOCS_ORIGIN}/components/cord-threads?version=2.0`,
    thread: `${DOCS_ORIGIN}/components/cord-thread?version=2.0`
  }
};

// scripts/call-batch-with-random-data.ts
async function main() {
  const argv = yargs(process.argv.slice(2)).option({
    host: {
      description: "API host to use (ex: api.cord.com)",
      type: "string",
      default: `local.cord.com:8161`
    },
    organizations: {
      description: "the number of organizations to create within the platform app",
      type: "number",
      default: 1
    },
    users: {
      description: "the number of users to create within each organization",
      type: "number",
      default: 10
    }
  }).argv;
  const { host, users: userCount, organizations: orgCount } = argv;
  console.time("Got access token");
  const authorizeResponse = await fetch(`https://${host}/v1/authorize`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      signed_app_token: jsonwebtoken.sign(
        { app_id: CORD_APPLICATION_ID },
        "cordrulez",
        { expiresIn: "1 min", algorithm: "HS512" }
      )
    })
  });
  const { access_token } = await authorizeResponse.json();
  console.timeEnd("Got access token");
  console.time("Generated data");
  const users = Array.from({ length: userCount * orgCount }).map(
    (_, index) => ({
      id: uuid(),
      name: `user ${index}`,
      email: `user-${index}@cord.com`,
      first_name: `user`,
      last_name: `${index}`
    })
  );
  const organizations = Array.from({ length: orgCount }).map((_, index) => ({
    id: uuid(),
    name: `organization ${index}`,
    members: users.slice(index * userCount, (index + 1) * userCount).map(({ id }) => id)
  }));
  console.timeEnd("Generated data");
  console.time("POST batch data");
  const batchResponse = await fetch(`https://${host}/v1/batch`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ users, organizations })
  });
  console.timeEnd("POST batch data");
  const text = await batchResponse.text();
  console.log(text);
}
main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=call-batch-with-random-data.js.map
