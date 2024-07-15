#!/usr/bin/env -S node --enable-source-maps

// scripts/cord-dot-com-generate-search-data.ts
import { writeFileSync } from "fs";
import * as path from "path";
import * as url from "url";
import OpenAI from "openai";
import "dotenv/config.js";

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

// docs/lib/parseDownToPlaintext.ts
import { parse } from "parse5";

// docs/lib/hasOwnProperty.ts
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// docs/lib/parseDownToPlaintext.ts
var DATA_SEARCH_IGNORE = "data-cord-search-ignore";
var blockLevelNodeNames = /* @__PURE__ */ new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "canvas",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "noscript",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "tfoot",
  "ul",
  "video"
]);
function assertIsAttrList(thing) {
  if (Array.isArray(thing)) {
    return thing;
  }
  throw new Error("Malformed attribute list");
}
var MAX_PART_LENGTH = 3900;
function addContent(v, data) {
  if (data.currentPartsLength + v.length > MAX_PART_LENGTH) {
    data.finalOutput.push(data.currentParts.join(""));
    if (v.length > MAX_PART_LENGTH) {
      let remainder = v;
      while (remainder.length) {
        if (remainder.length < MAX_PART_LENGTH) {
          data.finalOutput.push(remainder);
          remainder = "";
          break;
        }
        let sliceIndex = MAX_PART_LENGTH;
        const convenientlyPlacedLineBreakIndex = remainder.indexOf(
          "\n",
          MAX_PART_LENGTH - 200
        );
        const convenientlyPlacedSpaceIndex = remainder.indexOf(
          " ",
          MAX_PART_LENGTH - 200
        );
        if (convenientlyPlacedLineBreakIndex !== -1 && convenientlyPlacedLineBreakIndex < sliceIndex) {
          sliceIndex = convenientlyPlacedLineBreakIndex;
        } else if (convenientlyPlacedSpaceIndex !== -1 && convenientlyPlacedSpaceIndex < sliceIndex) {
          sliceIndex = convenientlyPlacedSpaceIndex;
        }
        const slice = remainder.substring(0, sliceIndex);
        data.finalOutput.push(slice);
        remainder = remainder.substring(sliceIndex);
      }
      data.currentParts = [];
      data.currentPartsLength = 0;
    } else {
      data.currentParts = [v];
      data.currentPartsLength = v.length;
    }
  } else {
    data.currentParts.push(v);
    data.currentPartsLength += v.length;
  }
}
function appendTextNodes(data, nodeList, currentHeadingLevel = 0, isPreformatted = false) {
  outer: for (const node of nodeList) {
    if (node.nodeName === "iframe" || node.nodeName === "script" || node.nodeName === "noscript" || node.nodeName === "style" || node.nodeName === "nav" || node.nodeName === "header" || node.nodeName === "footer" || node.nodeName === "wbr") {
      continue;
    }
    let headingLevel = 0;
    const match = node.nodeName.match(/^h(\d)$/i);
    if (match) {
      headingLevel = parseInt(match[1], 10);
      if (headingLevel < currentHeadingLevel) {
        data.finalOutput.push(data.currentParts.join(""));
        data.currentParts = [];
        data.currentPartsLength = 0;
      }
      currentHeadingLevel = headingLevel;
    }
    if (node.nodeName === "hr") {
      addContent("\n-----\n", data);
    } else if (node.nodeName === "#text") {
      const v = node.value + (isPreformatted ? "" : "");
      addContent(v, data);
    } else {
      if (hasOwnProperty(node, "attrs")) {
        const attrList = assertIsAttrList(node.attrs);
        for (const attr of attrList) {
          if (attr.name === DATA_SEARCH_IGNORE) {
            continue outer;
          }
        }
      }
      if (hasOwnProperty(node, "childNodes") && Array.isArray(node.childNodes)) {
        const newPreTag = node.nodeName === "pre";
        if (newPreTag) {
          data.currentParts.push("\n```\n");
          data.currentPartsLength += 5;
        }
        if (blockLevelNodeNames.has(node.nodeName) && !newPreTag) {
          data.currentParts.push("\n");
          data.currentPartsLength += 1;
        }
        if (node.nodeName === "li") {
          data.currentParts.push("\n- ");
          data.currentPartsLength += 3;
        }
        appendTextNodes(
          data,
          node.childNodes,
          currentHeadingLevel,
          isPreformatted || newPreTag
        );
        if (blockLevelNodeNames.has(node.nodeName) && !newPreTag) {
          data.currentParts.push("\n");
          data.currentPartsLength += 1;
        }
        if (newPreTag) {
          data.currentParts.push("\n```\n");
          data.currentPartsLength += 5;
        }
      }
    }
    if (headingLevel) {
      data.currentParts.push("\n\n");
      data.currentPartsLength += 2;
    }
  }
}
function getBody(childNodes) {
  for (const child of childNodes) {
    if (child.nodeName === "body") {
      return child;
    } else if (hasOwnProperty(child, "childNodes") && Array.isArray(child.childNodes)) {
      const body = getBody(child.childNodes);
      if (body) {
        return body;
      }
    }
  }
  return void 0;
}
function parseDownToPlaintextStrings(page) {
  const root = parse(page);
  const body = getBody(root.childNodes);
  if (!body || !hasOwnProperty(body, "childNodes") || !Array.isArray(body.childNodes)) {
    return [];
  }
  const data = {
    finalOutput: [],
    currentParts: [],
    currentPartsLength: 0
  };
  appendTextNodes(data, body.childNodes);
  if (data.currentParts.length) {
    const chunk = data.currentParts.join("");
    data.finalOutput.push(chunk);
  }
  data.finalOutput = data.finalOutput.map((str) => str.replace(/\n\n\n+/g, "\n\n\n")).filter((str) => !str.match(/^\s+$/)).filter(Boolean);
  return data.finalOutput;
}
var parseDownToPlaintext_default = parseDownToPlaintextStrings;

// scripts/cord-dot-com-generate-search-data.ts
var PAGES_TO_IGNORE = /* @__PURE__ */ new Set(["https://cord.com/server"]);
var MAX_EMBEDDING_TEXT_LENGTH = 2e4;
var openai = new OpenAI({
  apiKey: Env_default.OPENAI_API_SECRET
});
async function createEmbedding(input) {
  return await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input
  });
}
function getTitleByFuglyRegex(txt) {
  const titleTag = txt.match(/<title>([^<]*)<\/title>/);
  if (!titleTag) {
    throw new Error("Could not find any loc tags in the sitemap?");
  }
  return titleTag[1];
}
async function getChunkedSitePages() {
  const res = await fetch("https://cord.com/sitemap.xml");
  const rawXML = await res.text();
  const locTags = rawXML.match(/<loc>[^<]*<\/loc>/g);
  if (!locTags) {
    throw new Error("Could not find any loc tags in the sitemap?");
  }
  const locs = locTags.map((locTag) => locTag.substring(5, locTag.length - 6)).filter((loc) => !PAGES_TO_IGNORE.has(loc));
  const chunks = [];
  const promises = [];
  for (const locUrl of locs) {
    promises.push(
      (async () => {
        const pageResponse = await fetch(locUrl);
        const txt = await pageResponse.text();
        const plaintexts = parseDownToPlaintext_default(txt);
        let title = getTitleByFuglyRegex(txt) || "Cord.com";
        if (title.includes("Cord | Make the internet multiplayer | ")) {
          title = title.replace("Cord | Make the internet multiplayer | ", "");
        }
        for (const plaintext of plaintexts) {
          chunks.push({
            url: locUrl,
            title,
            plaintext
          });
        }
      })()
    );
  }
  await Promise.all(promises);
  return chunks;
}
var main = async () => {
  const chunks = await getChunkedSitePages();
  const embeddings = [];
  const promises = [];
  for (const chunk of chunks) {
    const embedding = {
      url: chunk.url,
      embedding: void 0,
      plaintext: chunk.plaintext,
      title: chunk.title
    };
    embeddings.push(embedding);
    promises.push(
      (async () => {
        if (chunk.plaintext.length > MAX_EMBEDDING_TEXT_LENGTH) {
          console.error(
            "Truncating very long plaintext chunk for page: " + chunk.url
          );
          console.error("Plaintext chunk is: " + chunk.plaintext);
          process.exit(1);
        }
        try {
          const data = await createEmbedding(chunk.plaintext);
          embedding.embedding = data;
        } catch (e) {
          console.error(
            "Failed to fetch embedding for chunk: " + chunk.plaintext
          );
          console.error(e.message);
        }
      })()
    );
  }
  await Promise.all(promises);
  const embeddingsFile = `// @generated by scripts/cord-dot-com-generate-search-data.ts
import type { CordDotComCachedEmbedding } from 'common/types/index.ts';

const embeddings: CordDotComCachedEmbedding[] = ${JSON.stringify(
    embeddings,
    null,
    2
  )};

export default embeddings;
`;
  writeFileSync(
    path.join(
      path.dirname(url.fileURLToPath(import.meta.url)),
      "../../docs/server/searchData/CordDotComEmbeddings.ts"
    ),
    embeddingsFile
  );
};
Promise.resolve(main()).catch((err) => {
  console.error(err);
  process.exit(1);
});

//# sourceMappingURL=cord-dot-com-generate-search-data.js.map
