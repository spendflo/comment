#!/usr/bin/env -S node --enable-source-maps --no-deprecation
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// scripts/generate-customer-auth-token.ts
import "dotenv/config.js";
import yargs from "yargs";

// opensource/sdk-js/packages/server/authToken.ts
import * as jwt from "jsonwebtoken";
function getApplicationManagementAuthToken(customer_id, customer_secret, options = {}) {
  return jwt.sign({ customer_id }, customer_secret, {
    algorithm: "HS512",
    expiresIn: options.expires ?? "1 min"
  });
}

// server/src/entity/sequelize.ts
import { Sequelize as Sequelize7 } from "sequelize-typescript";
import { DatabaseError, QueryTypes, Transaction } from "sequelize";

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

// server/src/entity/event/EventEntity.ts
import { Table, Column, PrimaryKey, Model } from "sequelize-typescript";
import { DataTypes } from "sequelize";
var EventEntity = class extends Model {
};
__decorateClass([
  PrimaryKey,
  Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  })
], EventEntity.prototype, "id", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID
  })
], EventEntity.prototype, "pageLoadID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID
  })
], EventEntity.prototype, "installationID", 2);
__decorateClass([
  Column({
    type: DataTypes.TEXT
  })
], EventEntity.prototype, "version", 2);
__decorateClass([
  Column({
    type: DataTypes.JSONB
  })
], EventEntity.prototype, "utmParameters", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID
  })
], EventEntity.prototype, "userID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID
  })
], EventEntity.prototype, "orgID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID
  })
], EventEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column({
    type: DataTypes.NUMBER
  })
], EventEntity.prototype, "eventNumber", 2);
__decorateClass([
  Column({
    type: DataTypes.TIME
  })
], EventEntity.prototype, "clientTimestamp", 2);
__decorateClass([
  Column({
    type: DataTypes.TIME
  })
], EventEntity.prototype, "serverTimestamp", 2);
__decorateClass([
  Column({
    type: DataTypes.STRING
  })
], EventEntity.prototype, "type", 2);
__decorateClass([
  Column({
    type: DataTypes.JSONB,
    defaultValue: {}
  })
], EventEntity.prototype, "payload", 2);
__decorateClass([
  Column({
    type: DataTypes.JSONB,
    defaultValue: {}
  })
], EventEntity.prototype, "metadata", 2);
__decorateClass([
  Column({
    type: DataTypes.ENUM("prod", "staging", "test", "dev"),
    allowNull: false,
    primaryKey: true
  })
], EventEntity.prototype, "tier", 2);
EventEntity = __decorateClass([
  Table({
    tableName: "events",
    timestamps: false
  })
], EventEntity);

// server/src/entity/message/MessageEntity.ts
import {
  Table as Table2,
  Column as Column2,
  PrimaryKey as PrimaryKey2,
  Model as Model2,
  DefaultScope
} from "sequelize-typescript";
import { DataTypes as DataTypes2, Sequelize } from "sequelize";

// common/types/index.ts
import jsonStableStringify from "fast-json-stable-stringify";

// common/util/index.ts
import md5 from "blueimp-md5";
import jsonStableStringify2 from "fast-json-stable-stringify";
import { unique } from "radash";
import shajs from "sha.js";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar.js";
import isBetween from "dayjs/plugin/isBetween.js";

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
var SLACK_APP_ID = "A015A3DFAP8";
var SLACK_ADMIN_LOGIN_APP_ID = "A02CVJG9EAH";
var SLACK_DEV_APP_ID = "A01TRD46PU4";
var SLACK_INTERNAL_TOOLS_APP_ID = "A04JKM945CM";
var CORD_SLACK_APP_IDS = [
  SLACK_APP_ID,
  SLACK_DEV_APP_ID,
  SLACK_ADMIN_LOGIN_APP_ID,
  SLACK_INTERNAL_TOOLS_APP_ID
];
var AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
var CORD_CUSTOMER_ID = "12ed6251-28d5-4686-9a75-20a15bd31499";
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

// opensource/sdk-js/packages/react/common/lib/messageNode.ts
import { Element } from "slate";
import { v4 as uuid } from "uuid";

// common/util/index.ts
function isDefined(value) {
  return value !== null && value !== void 0;
}
dayjs.extend(Calendar);
dayjs.extend(isBetween);

// server/src/entity/message/MessageEntity.ts
var MessageEntity = class extends Model2 {
  isDeleted() {
    return this.deletedTimestamp !== null;
  }
};
__decorateClass([
  PrimaryKey2,
  Column2({
    type: DataTypes2.UUID,
    defaultValue: DataTypes2.UUIDV4
  })
], MessageEntity.prototype, "id", 2);
__decorateClass([
  Column2({ type: DataTypes2.STRING })
], MessageEntity.prototype, "externalID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], MessageEntity.prototype, "orgID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], MessageEntity.prototype, "threadID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID,
    allowNull: false
  })
], MessageEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], MessageEntity.prototype, "sourceID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.JSONB,
    get() {
      return cleanseMessageContent(this.getDataValue("content"));
    }
  })
], MessageEntity.prototype, "content", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "url", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TIME
  })
], MessageEntity.prototype, "timestamp", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TIME
  })
], MessageEntity.prototype, "deletedTimestamp", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TIME
  })
], MessageEntity.prototype, "lastUpdatedTimestamp", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "importedSlackChannelID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "importedSlackMessageTS", 2);
__decorateClass([
  Column2({
    type: DataTypes2.ENUM("reply", "supportBotReply"),
    defaultValue: null
  })
], MessageEntity.prototype, "importedSlackMessageType", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "importedSlackMessageThreadTS", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID,
    defaultValue: null
  })
], MessageEntity.prototype, "replyToEmailNotificationID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.ENUM("action_message", "user_message"),
    defaultValue: "user_message"
  })
], MessageEntity.prototype, "type", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "iconURL", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], MessageEntity.prototype, "translationKey", 2);
__decorateClass([
  Column2({
    type: DataTypes2.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], MessageEntity.prototype, "metadata", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT,
    defaultValue: ""
  })
], MessageEntity.prototype, "extraClassnames", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TSVECTOR
  })
], MessageEntity.prototype, "contentTsVector", 2);
__decorateClass([
  Column2({
    type: DataTypes2.VIRTUAL
  })
], MessageEntity.prototype, "createdAtWithMicros", 2);
__decorateClass([
  Column2({
    type: DataTypes2.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
], MessageEntity.prototype, "skipLinkPreviews", 2);
MessageEntity = __decorateClass([
  DefaultScope(() => ({
    attributes: {
      include: [
        [
          // We're sorting on this, so the format matters, and sorting alphabetically equals sorting chronologically.
          Sequelize.literal(`TO_CHAR("timestamp", 'YYYY-MM-DD HH24:MI:SS.US')`),
          "createdAtWithMicros"
        ]
      ]
    }
  })),
  Table2({
    tableName: "messages",
    timestamps: false
  })
], MessageEntity);
function cleanseMessageContent(content) {
  if (!content) {
    return [];
  }
  return content.map(cleanseNode).filter(isDefined);
}
function cleanseNode(node) {
  if (node.type === "annotation" /* ANNOTATION */) {
    return void 0;
  } else if (node.type === "a" /* LINK_DEPRECATED */) {
    return {
      type: "link" /* LINK */,
      url: node.url,
      children: [{ text: node.text }]
    };
  }
  if ("children" in node) {
    return {
      ...node,
      children: cleanseMessageContent(node.children)
    };
  }
  return node;
}

// server/src/entity/org/OrgEntity.ts
import { Table as Table4, Column as Column4, PrimaryKey as PrimaryKey3, Model as Model4 } from "sequelize-typescript";
import { DataTypes as DataTypes4 } from "sequelize";

// server/src/entity/linked_orgs/LinkedOrgsEntity.ts
import { Table as Table3, Column as Column3, Model as Model3 } from "sequelize-typescript";
import { DataTypes as DataTypes3 } from "sequelize";
var LinkedOrgsEntity = class extends Model3 {
};
__decorateClass([
  Column3({
    type: DataTypes3.UUID,
    primaryKey: true,
    unique: true
  })
], LinkedOrgsEntity.prototype, "sourceOrgID", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("slack", "platform")
  })
], LinkedOrgsEntity.prototype, "sourceExternalProvider", 2);
__decorateClass([
  Column3({
    type: DataTypes3.UUID,
    primaryKey: true
  })
], LinkedOrgsEntity.prototype, "linkedOrgID", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("slack", "platform")
  })
], LinkedOrgsEntity.prototype, "linkedExternalProvider", 2);
__decorateClass([
  Column3({
    type: DataTypes3.UUID
  })
], LinkedOrgsEntity.prototype, "mergerUserID", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TIME
  })
], LinkedOrgsEntity.prototype, "linkedTimestamp", 2);
LinkedOrgsEntity = __decorateClass([
  Table3({
    tableName: "linked_orgs",
    timestamps: false
  })
], LinkedOrgsEntity);

// server/src/slack/types.ts
function asSlackBotUserAuthData(x) {
  if (x && typeof x === "object" && !Array.isArray(x) && typeof x.bot_user_id === "string" && typeof x.bot_access_token === "string") {
    return {
      bot_user_id: x.bot_user_id,
      bot_access_token: x.bot_access_token
    };
  }
  return null;
}

// server/src/entity/org/OrgEntity.ts
var OrgEntity = class extends Model4 {
  async getLinkedOrg() {
    if (this.externalProvider !== "platform") {
      return null;
    }
    return await OrgEntity.findOne({
      include: {
        model: LinkedOrgsEntity,
        required: true,
        where: {
          sourceOrgID: this.id,
          sourceExternalProvider: this.externalProvider
        }
      }
    });
  }
  async loadLinkedSlackOrg() {
    if (this.externalProvider === "slack") {
      return this;
    }
    const slackOrg = await this.getLinkedOrg();
    return slackOrg?.externalProvider === "slack" ? slackOrg : null;
  }
  async getSlackBotCredentials() {
    const slackOrg = await this.loadLinkedSlackOrg();
    if (slackOrg) {
      const authData = asSlackBotUserAuthData(slackOrg.externalAuthData);
      if (authData) {
        return { org: slackOrg, ...authData };
      }
    }
    return null;
  }
};
__decorateClass([
  PrimaryKey3,
  Column4({
    type: DataTypes4.UUID,
    defaultValue: DataTypes4.UUIDV4
  })
], OrgEntity.prototype, "id", 2);
__decorateClass([
  Column4({ type: DataTypes4.TIME })
], OrgEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column4({ type: DataTypes4.ENUM("inactive", "active") })
], OrgEntity.prototype, "state", 2);
__decorateClass([
  Column4({ type: DataTypes4.STRING })
], OrgEntity.prototype, "name", 2);
__decorateClass([
  Column4({ type: DataTypes4.STRING, allowNull: true })
], OrgEntity.prototype, "domain", 2);
__decorateClass([
  Column4({ type: DataTypes4.STRING, unique: "AppExternalIDUniqueness" })
], OrgEntity.prototype, "externalID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.ENUM("slack", "platform"),
    unique: "AppExternalIDUniqueness"
  })
], OrgEntity.prototype, "externalProvider", 2);
__decorateClass([
  Column4({ type: DataTypes4.JSONB })
], OrgEntity.prototype, "externalAuthData", 2);
__decorateClass([
  Column4({ type: DataTypes4.UUID, unique: "AppExternalIDUniqueness" })
], OrgEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column4({ type: DataTypes4.BOOLEAN, defaultValue: false, allowNull: false })
], OrgEntity.prototype, "internal", 2);
__decorateClass([
  Column4({
    type: DataTypes4.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], OrgEntity.prototype, "metadata", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT
  })
], OrgEntity.prototype, "customSlackAppID", 2);
OrgEntity = __decorateClass([
  Table4({
    tableName: "orgs",
    timestamps: false
  })
], OrgEntity);

// server/src/entity/user/UserEntity.ts
import { Table as Table5, Column as Column5, PrimaryKey as PrimaryKey4, Model as Model5 } from "sequelize-typescript";
import { DataTypes as DataTypes5 } from "sequelize";
var UserEntity = class extends Model5 {
};
__decorateClass([
  PrimaryKey4,
  Column5({
    type: DataTypes5.UUID,
    defaultValue: DataTypes5.UUIDV4
  })
], UserEntity.prototype, "id", 2);
__decorateClass([
  Column5({ type: DataTypes5.TIME })
], UserEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column5({ type: DataTypes5.TIME })
], UserEntity.prototype, "updatedTimestamp", 2);
__decorateClass([
  Column5({ type: DataTypes5.ENUM("person", "bot"), defaultValue: "person" })
], UserEntity.prototype, "userType", 2);
__decorateClass([
  Column5({ type: DataTypes5.BOOLEAN, defaultValue: false })
], UserEntity.prototype, "admin", 2);
__decorateClass([
  Column5({
    type: DataTypes5.ENUM("active", "deleted"),
    defaultValue: "active",
    allowNull: false
  })
], UserEntity.prototype, "state", 2);
__decorateClass([
  Column5({ type: DataTypes5.STRING })
], UserEntity.prototype, "name", 2);
__decorateClass([
  Column5({ type: DataTypes5.DATE })
], UserEntity.prototype, "nameUpdatedTimestamp", 2);
__decorateClass([
  Column5({ type: DataTypes5.STRING })
], UserEntity.prototype, "screenName", 2);
__decorateClass([
  Column5({ type: DataTypes5.STRING })
], UserEntity.prototype, "email", 2);
__decorateClass([
  Column5({ type: DataTypes5.STRING })
], UserEntity.prototype, "profilePictureURL", 2);
__decorateClass([
  Column5({ type: DataTypes5.DATE })
], UserEntity.prototype, "profilePictureURLUpdatedTimestamp", 2);
__decorateClass([
  Column5({ type: DataTypes5.STRING, unique: "AppExternalIDUniqueness" })
], UserEntity.prototype, "externalID", 2);
__decorateClass([
  Column5({ type: DataTypes5.ENUM("slack", "platform") })
], UserEntity.prototype, "externalProvider", 2);
__decorateClass([
  Column5({ type: DataTypes5.UUID, unique: "AppExternalIDUniqueness" })
], UserEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column5({
    type: DataTypes5.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], UserEntity.prototype, "metadata", 2);
UserEntity = __decorateClass([
  Table5({
    tableName: "users",
    timestamps: false
  })
], UserEntity);

// server/src/entity/file/FileEntity.ts
import { Table as Table11, Column as Column11, PrimaryKey as PrimaryKey5, Model as Model11 } from "sequelize-typescript";
import { DataTypes as DataTypes11 } from "sequelize";

// server/src/files/upload.ts
import * as crypto2 from "crypto";
import dayjs2 from "dayjs";
import utc from "dayjs/plugin/utc.js";
import * as credentialProviderNode from "@aws-sdk/credential-provider-node";

// common/const/Timing.ts
var UPLOAD_URL_TTL_SECONDS = 60 * 5;
var DOWNLOAD_URL_TTL_SECONDS = 60 * 60 * 4;
var DELETE_URL_TTL_SECONDS = 60 * 10;
var PAGE_PRESENCE_LOSS_TTL_SECONDS = 30;
var PRESENCE_UPDATE_INTERVAL_MS = PAGE_PRESENCE_LOSS_TTL_SECONDS * 1e3 / 2;
var DURABLE_PRESENCE_THROTTLE_MS = 60 * 1e3;
var ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24;
var SAMPLE_TOKEN_EXPIRY_SECONDS = 24 * 60 * 60 * 7;
var DOCS_TOKEN_EXPIRY_SECONDS = 24 * 60 * 60;

// server/src/logging/Logger.ts
import { hostname, userInfo } from "os";
import { serializeError } from "serialize-error";
import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import Transport from "winston-transport";
import * as Sentry from "@sentry/node";

// server/src/entity/application/ApplicationEntity.ts
import { Table as Table8, Column as Column8, Model as Model8 } from "sequelize-typescript";
import { DataTypes as DataTypes8 } from "sequelize";

// server/src/featureflags/index.ts
import * as LaunchDarkly from "@launchdarkly/node-server-sdk";

// common/const/FeatureFlags.ts
var FeatureFlags = {
  USE_NEW_CSS_COMPONENTS: {
    key: "Use_new_CSS_components",
    defaultValue: {}
  },
  SUPPORT_CHAT_ENABLED: {
    key: "support_chat_enabled",
    defaultValue: false
  },
  ENABLE_ANNOTATIONS_SCREENSHOTS: {
    key: "enable_annotations_screenshots",
    defaultValue: true
  },
  ENABLE_PLAINTEXT_ANNOTATIONS: {
    key: "enable_plaintext_annotations",
    defaultValue: true
  },
  ENABLE_ATTACHMENTS: {
    key: "enable_attachments",
    defaultValue: true
  },
  EMAIL_SHARING: {
    key: "email_sharing",
    defaultValue: true
  },
  ENABLE_FORCE_REFRESH_PROVIDER: {
    key: "enable_force_refresh_provider",
    defaultValue: false
  },
  MONDAY_TASKS: {
    key: "monday_tasks",
    defaultValue: false
  },
  TAKE_SCREENSHOT_WHEN_CREATING_THREAD: {
    key: "take_screenshot_when_creating_thread",
    defaultValue: false
  },
  TAKE_SCREENSHOT_WHEN_SENDING_MESSAGE: {
    key: "take_screenshot_when_sending_message",
    defaultValue: false
  },
  OPEN_THREAD_SAME_PAGE: {
    key: "open_thread_same_page",
    defaultValue: false
  },
  SHOW_ACTIVATION_WELCOME_MESSAGE_NUX: {
    key: "show_activation_welcome_message_nux",
    defaultValue: false
  },
  ENABLE_SLACK_FEATURES: {
    key: "enable-slack-features",
    defaultValue: true
  },
  ENABLE_DEV_CONSOLE_SELF_SERVE: {
    key: "enable-dev-console-self-serve",
    defaultValue: false
  },
  // TODO: remove - no longer used
  THREAD_STYLING_TWEAKS: {
    key: "thread_styling_tweaks",
    defaultValue: false
  },
  REMOVE_TASKS_FEATURE: {
    key: "remove_tasks_feature",
    defaultValue: false
  },
  SHOW_COMMUNITY_IN_CONSOLE: {
    key: "show-community-in-console",
    defaultValue: true
  },
  SHOW_CUSTOMER_ISSUES_IN_CONSOLE: {
    key: "show-customer-issues-in-console",
    defaultValue: false
  },
  TAKE_SCREENSHOT_OF_CANVAS_ONLY: {
    key: "take_screenshot_of_canvas_only",
    defaultValue: false
  },
  SHOW_EVENTS_TAB_IN_CONSOLE: {
    key: "show_events_tab_in_console",
    defaultValue: true
  },
  ENABLE_TEXT_ANNOTATIONS: {
    key: "enable_text_annotations",
    defaultValue: true
  },
  ENABLE_EMAIL_NOTIFICATIONS: {
    key: "enable_email_notifications",
    defaultValue: true
  },
  ENABLE_ANNOTATIONS_OVERLAY: {
    key: "enable_annotations_overlay",
    defaultValue: true
  },
  ENABLE_SENTRY: {
    key: "enable_sentry",
    defaultValue: true
  },
  CONSOLE_WEBINAR_BANNER: {
    key: "console_webinar_banner",
    defaultValue: {}
  },
  ENABLE_VIDEO_CAPABILITIES: {
    key: "enable_video_capabilities",
    defaultValue: false
  },
  SHOW_LINK_PREVIEWS: {
    key: "show-link-previews",
    defaultValue: true
  },
  BILLING_ENABLED_IN_CONSOLE: {
    key: "billing_enabled_in_console",
    defaultValue: true
  },
  MENTION_NOTIFICATION_EMAIL_TEMPLATE_ID: {
    key: "mention_notification_email_template_id",
    defaultValue: "d-6309e6ccb36a4a769957795f475c8130"
  },
  SHOW_CONSOLE_LANDING_PAGE: {
    key: "show_console_landing_page",
    defaultValue: false
  }
};
var defaults = Object.fromEntries(
  Object.entries(FeatureFlags).map(([_, v]) => [v.key, v.defaultValue])
);

// server/src/email/index.ts
import * as sgMail from "@sendgrid/mail";
import * as jwt2 from "jsonwebtoken";

// server/src/entity/email_notification/EmailOutboundNotificationEntity.ts
import { Table as Table6, Column as Column6, Model as Model6 } from "sequelize-typescript";
import { DataTypes as DataTypes6 } from "sequelize";
var EmailOutboundNotificationEntity = class extends Model6 {
};
__decorateClass([
  Column6({
    type: DataTypes6.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes6.UUIDV4
  })
], EmailOutboundNotificationEntity.prototype, "id", 2);
__decorateClass([
  Column6({
    type: DataTypes6.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "userID", 2);
__decorateClass([
  Column6({
    type: DataTypes6.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "orgID", 2);
__decorateClass([
  Column6({
    type: DataTypes6.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "threadOrgID", 2);
__decorateClass([
  Column6({
    type: DataTypes6.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "threadID", 2);
__decorateClass([
  Column6({
    type: DataTypes6.TEXT,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "email", 2);
EmailOutboundNotificationEntity = __decorateClass([
  Table6({
    tableName: "email_notifications",
    timestamps: false
  })
], EmailOutboundNotificationEntity);

// server/src/email/utils.ts
import addrs from "email-addresses";
import isUUID from "validator/lib/isUUID.js";
import replyParser from "node-email-reply-parser";

// common/const/Sizes.ts
var XSMALL = 2;
var SMALL = 4;
var MEDIUM = 8;
var LARGE = 16;
var XLARGE = 24;
var XXLARGE = 32;
var XXXLARGE = 48;
var AVATAR_BORDER_WIDTH_PX = XSMALL;
var CHECKBOX_DEFAULT_SIZE_PX = LARGE;
var MAIN_CHAT_AVATAR_SIZE_PX = XLARGE + AVATAR_BORDER_WIDTH_PX * 2;
var MAIN_CHAT_AVATAR_MARGIN_RIGHT_PX = MEDIUM;
var Sizes = {
  // Sidebar
  SIDEBAR_COMPACT_WIDTH: 312,
  // used when viewport width is <= VIEWPORT_WIDTH_BREAKPOINT
  SIDEBAR_NORMAL_WIDTH: 416,
  // used when viewport width is > VIEWPORT_WIDTH_BREAKPOINT
  SIDEBAR_MAX_WIDTH: 500,
  VIEWPORT_WIDTH_BREAKPOINT: 1440,
  // Navigation top bar
  NAVIGATION_ITEM_SPACING_COMPACT: 12,
  NAVIGATION_ITEM_SPACING_NORMAL: LARGE,
  // subtract MEDIUM here, add it to the sidebar App.tsx container paddingBottom, to allow shadows to be visible
  SIDEBAR_BOTTOM_SPACE: 96 - MEDIUM,
  // Text
  X_SMALL_TEXT_SIZE_PX: 10,
  SMALL_TEXT_SIZE_PX: 12,
  DEFAULT_TEXT_SIZE_PX: 14,
  LARGE_TEXT_SIZE_PX: 18,
  X_LARGE_TEXT_SIZE_PX: 24,
  SMALL_LINE_HEIGHT_PX: 16,
  DEFAULT_LINE_HEIGHT_PX: 20,
  LARGE_LINE_HEIGHT_PX: 24,
  X_LARGE_LINE_HEIGHT_PX: 32,
  BOLD_TEXT_WEIGHT: 700,
  NORMAL_TEXT_WEIGHT: 400,
  // Spacing
  SMALL_PADDING_PX: 6,
  DEFAULT_PADDING_PX: 12,
  DEFAULT_BORDER_RADIUS: SMALL,
  LARGE_BORDER_RADIUS: MEDIUM,
  SMALL_BORDER_RADIUS: XSMALL,
  // Icon
  DEFAULT_ICON_PADDING_PX: 4,
  // Profile pics
  PAGE_VISITORS_AVATAR_SIZE_PX: XLARGE + AVATAR_BORDER_WIDTH_PX * 2,
  MAIN_CHAT_AVATAR_SIZE_PX,
  MAIN_CHAT_AVATAR_MARGIN_RIGHT_PX,
  MESSAGE_LEFT_PADDING: MAIN_CHAT_AVATAR_SIZE_PX + MAIN_CHAT_AVATAR_MARGIN_RIGHT_PX,
  AVATAR_BORDER_WIDTH_PX,
  FACEPILE_AVATAR_OVERLAP_SIZE_PX: SMALL,
  NOTIFICATION_FACEPILE_SIZE: LARGE + AVATAR_BORDER_WIDTH_PX * 2,
  // Composer
  COMPOSER_ADD_BUTTON_HEIGHT_PX: XXLARGE,
  COMPOSER_ADD_BUTTON_WIDTH_PX: XXLARGE,
  COMPOSER_HORIZONTAL_PADDING: MEDIUM,
  COMPOSER_VERTICAL_PADDING: 18,
  MAX_COMPOSER_EDITOR_HEIGHT: 448,
  // Messages
  MESSAGE_BLOCK_BOTTOM_MARGIN: XLARGE,
  MESSAGE_BOTTOM_MARGIN: MEDIUM * 1.5,
  MESSAGE_CONTENTS_TOP_MARGIN: 5,
  MESSAGE_PARAGRAPH_TOP_MARGIN: MEDIUM,
  MESSAGE_REACTIONS_TOP_MARGIN: SMALL,
  MESSAGE_REACTIONS_BOTTOM_MARGIN: -MEDIUM,
  MESSAGE_SEEN_BY_BOTTOM_MARGIN: MEDIUM,
  MESSAGE_REACTIONS_FACEPILE_OVERLAP: 6,
  MESSAGE_PAST_REACTION_HEIGHT: LARGE,
  MESSAGE_ANNOTATION_HEIGHT_PX: 40,
  MESSAGES_KEBAB_MENU_WIDTH_PX: 196,
  MESSAGE_HEIGHT_TRUNCATE_AT_PX: 300,
  MESSAGE_HEIGHT_TRUNCATE_TO_PX: 200,
  INFINITE_SCROLL_THRESHOLD_PX: 400,
  MESSAGE_ATTACHMENT_PLACEHOLDER_HEIGHT_PX: 92,
  // 277 is the height of kebab menu for your own message, with one line of 'seen by'
  // We set the minHeight of the share to slack menu to this
  MIN_KEBAB_SLACK_MENU_HEIGHT: 277,
  // Distance between kebab menu and kebab menu icon
  KEBAB_MENU_OFFSET: SMALL,
  // Bullets / numbered / todo lists
  BULLET_PADDING_LEFT: CHECKBOX_DEFAULT_SIZE_PX + MEDIUM,
  // Todo - feed this into the menu itself (prob via more dynamic svg)
  MESSAGE_MENU_HEIGHT: 32,
  // Tooltip
  TOOLTIP_HORIZONTAL_PADDING_PX: MEDIUM,
  TOOLTIP_VERTICAL_PADDING_PX: SMALL,
  TOOLTIP_LINE_HEIGHT_PX: LARGE,
  TOOLTIP_MAX_WIDTH_PX: 180,
  ANNOTATION_TOOLTIP_MAX_WIDTH_PX: 180,
  // Attachments
  ATTACHMENT_THUMBNAIL_PX: 58,
  PDF_ATTACHMENT_PX: 90,
  // Modal
  MODAL_SELECT_CHANNELS_MAX_HEIGHT_PX: 240,
  // ImageModal
  IMAGE_MODAL_SMALL_SCALE: 0.66,
  IMAGE_MODAL_BUTTON_HEIGHT_SCALE_PX: 40,
  IMAGE_MODAL_MENU_MAX_WIDTH_PX: 180,
  IMAGE_MODAL_MENU_TOP_POSITION_PX: 44,
  // Success Popup
  SUCCESS_POPUP_HEIGHT: 36,
  // Annotation pointer
  ANNOTATION_POINTER_MIN_GAP_VS_SCREEN_EDGE: MEDIUM,
  ANNOTATION_POINTER_SMALL_SIZE_PX: 34,
  // 32 + 1 for border on each side, which is included in the svg
  // Annotation arrow
  ANNOTATION_ARROW_CIRCLE_RADIUS: 4,
  ANNOTATION_ARROW_HORIZONTAL_MARGIN_FOR_TOOLTIP: XXLARGE,
  // Charts in webpage
  MIN_CHART_SIZE_PX: 50,
  MAX_CHART_CONTAINER_SIZE_RATIO: 1.25,
  // Login
  LOGIN_BUTTON_WIDTH_PX: 354,
  LOGIN_BUTTON_HEIGHT_PX: 56,
  LOGIN_MARGIN_PX: 56,
  LOGIN_BUTTON_TEXT_SIZE_PX: 18,
  LOGIN_TITLE_TEXT_SIZE_PX: 36,
  EMAIL_PROMPT_HEIGHT_PX: 128,
  EMAIL_PROMPT_INPUT_VERTICAL_PADDING_PX: 14,
  // Welcome
  WELCOME_PARAGRAPH_MAX_WIDTH_PX: 400,
  WELCOME_VIDEO_MAX_HEIGHT_PX: 300,
  WELCOME_VIDEO_MAX_WIDTH_PX: 600,
  // Workspace
  WORKSPACE_HORIZONTAL_MARGIN_PX: 56,
  WORKSPACE_VERTICAL_GAP_PX: 40,
  WORKSPACE_VERTICAL_GAP_SMALL_PX: 32,
  WORKSPACE_SMALL_PADDING_PX: 12,
  WORKSPACE_XSMALL_PADDING_PX: 6,
  WORKSPACE_PARAGRAPH_MAX_WIDTH_PX: 480,
  WORKSPACE_WIDTH_PX: 576,
  WORKSPACE_LOGIN_WIDTH_PX: 640,
  WORKSPACE_LOGIN_BUTTON_HEIGHT_PX: 48,
  WORKSPACE_LOGIN_ORG_IMAGE_SIZE_PX: XXXLARGE,
  WORKSPACE_GET_STARTED_STEP_MAX_WIDTH_PX: 290,
  WORKSPACE_GET_STARTED_STEP_MIN_WIDTH_PX: 230,
  RECENTLY_SHARED_MIN_WIDTH_PX: 120,
  RECENTLY_SHARED_MAX_WIDTH_PX: 240,
  UPDATES_MAX_WIDTH_PX: 320,
  // Extension popup
  EXTENSION_POPUP_WIDTH: 360,
  EXTENSION_POPUP_HEIGHT: 540,
  EXTENSION_POPUP_START_CONVERSATION_BUTTON_HEIGHT: 60,
  SPINNER_DEFAULT_HEIGHT_PX: 20,
  SPINNER_LARGE_HEIGHT_PX: 40,
  CHECKBOX_DEFAULT_SIZE_PX,
  DEFAULT_ICON_SIZE: 24,
  SMALL_ICON_SIZE: 16,
  X_SMALL_ICON_SIZE: 12,
  DEFAULT_BORDER_WIDTH: 1,
  COLLAPSED_THREAD_MESSAGE_HEIGHT: 44,
  ADD_THREAD_BUTTONS_HEIGHT: 60,
  GAP_BETWEEN_THREADS: XLARGE,
  GAP_BETWEEN_GROUPED_THREADS: MEDIUM,
  LOAD_OLDER_MESSAGES_BUTTON_HEIGHT: 33,
  THREAD_MESSAGE_PADDING: MEDIUM,
  SCREENSHOT_BLUR_PX: 10,
  //Screen Size for Embed
  MINIMUM_SCREEN_WIDTH: 600,
  MINIMUM_SCREEN_HEIGHT: 600,
  // Puppet Auth
  PUPPET_MODAL_TOP_MARGIN: 60,
  PUPPET_MODAL_TOP_PADDING: 36,
  PUPPET_MODAL_PADDING: 40,
  PUPPET_MODAL_VERTICAL_PADDING_BUTTON: 10,
  PUPPET_MODAL_VERTICAL_PADDING_TEXT_FIELD: 10,
  // Launcher / Close sidebar button
  LAUNCHER_ICON_HEIGHT: 60,
  LAUNCHER_ICON_WIDTH: 60,
  CLOSE_SIDEBAR_ICON_HEIGHT: 60,
  CLOSE_SIDEBAR_ICON_WIDTH: 60,
  LAUNCHER_FIXED_RIGHT_LENGTH: 16,
  LAUNCHER_FIXED_BOTTOM_LENGTH: 16,
  XSMALL,
  SMALL,
  MEDIUM,
  LARGE,
  XLARGE,
  XXLARGE,
  XXXLARGE
};
var FontSizes = {
  xSmall: Sizes.X_SMALL_TEXT_SIZE_PX,
  small: Sizes.SMALL_TEXT_SIZE_PX,
  default: Sizes.DEFAULT_TEXT_SIZE_PX,
  large: Sizes.LARGE_TEXT_SIZE_PX,
  xLarge: Sizes.X_LARGE_TEXT_SIZE_PX,
  inherit: "inherit"
};
var LineHeights = {
  xSmall: `${Sizes.SMALL_LINE_HEIGHT_PX}px`,
  small: `${Sizes.SMALL_LINE_HEIGHT_PX}px`,
  default: `${Sizes.DEFAULT_LINE_HEIGHT_PX}px`,
  large: `${Sizes.LARGE_LINE_HEIGHT_PX}px`,
  xLarge: `${Sizes.X_LARGE_LINE_HEIGHT_PX}px`,
  inherit: "inherit"
};

// server/src/entity/customer/CustomerEntity.ts
import { Table as Table7, Column as Column7, Model as Model7 } from "sequelize-typescript";
import { DataTypes as DataTypes7 } from "sequelize";
var CustomerEntity = class extends Model7 {
};
__decorateClass([
  Column7({
    type: DataTypes7.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes7.UUIDV4
  })
], CustomerEntity.prototype, "id", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TEXT,
    allowNull: false
  })
], CustomerEntity.prototype, "name", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TEXT
  })
], CustomerEntity.prototype, "sharedSecret", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ENUM("verified", "sample"),
    defaultValue: "verified",
    allowNull: false
  })
], CustomerEntity.prototype, "type", 2);
__decorateClass([
  Column7({
    type: DataTypes7.VIRTUAL(DataTypes7.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["custom_s3_bucket"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomS3Bucket", 2);
__decorateClass([
  Column7({
    type: DataTypes7.VIRTUAL(DataTypes7.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["custom_segment_write_key"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomSegmentWriteKey", 2);
__decorateClass([
  Column7({
    type: DataTypes7.VIRTUAL(DataTypes7.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["customer_support"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomerSupport", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ENUM(
      "launched",
      "implementing",
      "proof_of_concept",
      "inactive"
    ),
    allowNull: false,
    defaultValue: "proof_of_concept"
  })
], CustomerEntity.prototype, "implementationStage", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TIME,
    allowNull: true
  })
], CustomerEntity.prototype, "launchDate", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "slackChannel", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "signupCoupon", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "stripeCustomerID", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ENUM("free", "pro", "scale"),
    allowNull: true,
    defaultValue: "free"
  })
], CustomerEntity.prototype, "pricingTier", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ENUM("active", "inactive"),
    allowNull: true,
    defaultValue: "inactive"
  })
], CustomerEntity.prototype, "billingStatus", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ENUM("stripe", "manual"),
    allowNull: true,
    defaultValue: null
  })
], CustomerEntity.prototype, "billingType", 2);
__decorateClass([
  Column7({
    type: DataTypes7.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], CustomerEntity.prototype, "addons", 2);
__decorateClass([
  Column7({
    type: DataTypes7.TIME,
    allowNull: true
  })
], CustomerEntity.prototype, "renewalDate", 2);
__decorateClass([
  Column7({
    type: DataTypes7.ARRAY(DataTypes7.TEXT),
    defaultValue: [],
    allowNull: false
  })
], CustomerEntity.prototype, "planDescription", 2);
CustomerEntity = __decorateClass([
  Table7({
    tableName: "customers",
    timestamps: false
  })
], CustomerEntity);

// server/src/email/index.ts
sgMail.default.setApiKey(Env_default.SENDGRID_API_KEY);
var DEFAULT_MENTION_NOTIFICATION_V2_TEMPLATE_ID = "d-6309e6ccb36a4a769957795f475c8130";
var DEFAULT_SHARE_TO_EMAIL_TEMPLATE_ID = "d-fecc876acf684ff2bca887748d86e4e1";
var DEFAULT_THREAD_RESOLVE_TEMPLATE_ID = "d-93aa618e7d0b4ba593c346f9a1f664c5";

// server/src/featureflags/index.ts
var client = void 0;
var clientReady = false;
var ServerOnlyFeatureFlags = {
  QUERY_PARAM_DEEP_LINKS: {
    key: "query_param_deep_links",
    defaultValue: false
  },
  NOTIFY_PAGE_VISITORS_OF_EVERY_MESSAGE: {
    key: "notify_page_visitors_of_every_new_message",
    defaultValue: false
  },
  USER_IS_BLOCKED: {
    key: "user_is_blocked",
    defaultValue: false
  },
  SHOW_CORD_COPY_IN_TASKS: {
    key: "show-cord-copy-in-tasks",
    defaultValue: true
  },
  LOADER_CACHES: {
    key: "loader_caches",
    defaultValue: true
  },
  SUBSCRIBE_ALL_ORG_MEMBERS: {
    key: "subscribe_all_org_members",
    defaultValue: false
  },
  WRITE_TO_EVENTS_TABLE: {
    key: "write_to_events_table",
    defaultValue: true
  },
  ALLOW_MAGIC_GRAPHQL_ORG_ID_OVERRIDE: {
    key: "allow-magic-graph-ql-org-id-override",
    defaultValue: true
  },
  GRANULAR_PERMISSIONS: {
    key: "granular-permissions",
    defaultValue: false
  },
  SKIP_PUBLISH_USER_IDENTITY_UPDATE: {
    key: "skip_publish_user_identity_update",
    defaultValue: false
  },
  RATE_LIMITS: {
    key: "rate_limits",
    defaultValue: { maxCount: 5e4, seconds: 5 * 60 }
  },
  EMAIL_NOTIFICATION_TEMPLATE_ID: {
    key: "email-notification-template-id",
    defaultValue: {
      mention: DEFAULT_MENTION_NOTIFICATION_V2_TEMPLATE_ID,
      share_to_email: DEFAULT_SHARE_TO_EMAIL_TEMPLATE_ID,
      thread_resolve: DEFAULT_THREAD_RESOLVE_TEMPLATE_ID
    }
  }
};
var FeatureFlags2 = {
  ...FeatureFlags,
  ...ServerOnlyFeatureFlags
};
var mockClient;
async function getTypedFeatureFlagValue(feature, user) {
  const value = await getFeatureFlagValue(feature.key, user);
  return value === null ? feature.defaultValue : value;
}
async function getFeatureFlagValue(key, user) {
  if (mockClient) {
    return await mockClient(key, user);
  }
  if (!client || !clientReady) {
    return null;
  }
  const versionValue = versionToNumber(user.version);
  const ldUser = {
    // The choice of delimiter here is restricted by LaunchDarkly's website
    // currently being flaky for users with a key that contains characters that
    // need to be percent-encoded, so we need to choose something that doesn't
    // get encoded.
    key: user.orgID ? `${user.userID}_${user.orgID}` : user.userID,
    custom: {
      userID: user.userID,
      ...user.orgID && { orgID: user.orgID },
      platformApplicationID: user.platformApplicationID,
      ...versionValue && { version: versionValue },
      ...user.customerID && { customerID: user.customerID },
      ...user.appEnvironment && { appEnvironment: user.appEnvironment }
    }
  };
  return await client.variation(key, ldUser, null);
}
function versionToNumber(version) {
  if (!version) {
    return null;
  }
  if (version.startsWith("dev-")) {
    return -1;
  }
  const match = version.match(/^(\d+)[.](\d+)[.](\d+)$/);
  if (!match) {
    return null;
  }
  return 1e5 * (parseInt(match[1], 10) - 1) + parseInt(match[2], 10);
}

// server/src/entity/application/ApplicationEntity.ts
var ApplicationEntity = class extends Model8 {
  async isSupportChatEnabled() {
    const isSupportFlagEnabled = await getTypedFeatureFlagValue(
      FeatureFlags.SUPPORT_CHAT_ENABLED,
      {
        userID: "anonymous",
        orgID: void 0,
        platformApplicationID: this.id,
        version: null,
        customerID: this.customerID
      }
    );
    return Boolean(
      isSupportFlagEnabled && this.supportBotID && this.supportOrgID && this.supportSlackChannelID
    );
  }
  getCustomSlackAppDetails() {
    const details = this.customSlackAppDetails;
    if (details && typeof details === "object" && !Array.isArray(details) && typeof details.clientID === "string" && typeof details.clientSecret === "string" && typeof details.signingSecret === "string") {
      return {
        clientID: details.clientID,
        clientSecret: details.clientSecret,
        signingSecret: details.signingSecret
      };
    }
    return null;
  }
};
__decorateClass([
  Column8({
    type: DataTypes8.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes8.UUIDV4
  })
], ApplicationEntity.prototype, "id", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT,
    allowNull: false
  })
], ApplicationEntity.prototype, "name", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT
  })
], ApplicationEntity.prototype, "sharedSecret", 2);
__decorateClass([
  Column8({ type: DataTypes8.TIME })
], ApplicationEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column8({
    type: DataTypes8.JSONB
  })
], ApplicationEntity.prototype, "customEmailTemplate", 2);
__decorateClass([
  Column8({
    type: DataTypes8.BOOLEAN,
    defaultValue: true
  })
], ApplicationEntity.prototype, "enableEmailNotifications", 2);
__decorateClass([
  Column8({
    type: DataTypes8.JSONB
  })
], ApplicationEntity.prototype, "customLinks", 2);
__decorateClass([
  Column8({
    type: DataTypes8.UUID,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customS3Bucket", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT,
    defaultValue: null
  })
], ApplicationEntity.prototype, "segmentWriteKey", 2);
__decorateClass([
  Column8({
    type: DataTypes8.JSONB
  })
], ApplicationEntity.prototype, "customNUX", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT
  })
], ApplicationEntity.prototype, "iconURL", 2);
__decorateClass([
  Column8({
    type: DataTypes8.ENUM("free", "starter", "premium"),
    defaultValue: "free",
    allowNull: false
  })
], ApplicationEntity.prototype, "type", 2);
__decorateClass([
  Column8({
    type: DataTypes8.ENUM(
      "production",
      "staging",
      "sample",
      "sampletoken",
      "demo"
    ),
    defaultValue: "production",
    allowNull: false
  })
], ApplicationEntity.prototype, "environment", 2);
__decorateClass([
  Column8({
    type: DataTypes8.UUID
  })
], ApplicationEntity.prototype, "supportOrgID", 2);
__decorateClass([
  Column8({
    type: DataTypes8.UUID
  })
], ApplicationEntity.prototype, "supportBotID", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT
  })
], ApplicationEntity.prototype, "supportSlackChannelID", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT
  })
], ApplicationEntity.prototype, "redirectURI", 2);
__decorateClass([
  Column8({
    type: DataTypes8.UUID,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customerID", 2);
__decorateClass([
  Column8({
    type: DataTypes8.BOOLEAN,
    defaultValue: false
  })
], ApplicationEntity.prototype, "slackConnectAllOrgs", 2);
__decorateClass([
  Column8({
    type: DataTypes8.STRING,
    defaultValue: null
  })
], ApplicationEntity.prototype, "eventWebhookURL", 2);
__decorateClass([
  Column8({
    type: DataTypes8.ARRAY(DataTypes8.TEXT),
    defaultValue: null
  })
], ApplicationEntity.prototype, "eventWebhookSubscriptions", 2);
__decorateClass([
  Column8({
    type: DataTypes8.TEXT,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customSlackAppID", 2);
__decorateClass([
  Column8({
    type: DataTypes8.JSONB,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customSlackAppDetails", 2);
ApplicationEntity = __decorateClass([
  Table8({
    tableName: "applications",
    timestamps: false
  })
], ApplicationEntity);

// server/src/logging/Logger.ts
import "@sentry/tracing";

// server/src/logging/flatFormat.ts
import { format } from "winston";
import stringify from "fast-json-stable-stringify";
var MESSAGE = Symbol.for("message");
var flatFormat = format((info) => {
  const { level, timestamp, message, splat: _, ...meta } = info;
  let stringifiedMeta;
  try {
    stringifiedMeta = stringify(meta);
  } catch (err) {
    stringifiedMeta = `! stringify exception: ${err}`;
  }
  const formattedMessage = `${level.substr(0, 1).toUpperCase()} ${timestamp}: ${message} ${stringifiedMeta}`;
  info[MESSAGE] = formattedMessage;
  return info;
});

// package.json
var package_default = {
  name: "radical",
  version: "1.1093.0",
  description: "The monorepo for Radical",
  main: "index.js",
  repository: "ssh://radical@vault.phacility.com/source/monorepo.git",
  author: "jack@getradical.co",
  license: "NONE",
  private: true,
  type: "module",
  scripts: {
    test: "NODE_OPTIONS=--experimental-vm-modules jest",
    migrate: "sequelize-cli db:migrate",
    "migrate-down": "sequelize-cli db:migrate:undo",
    build: "npm run tsc-once && ./build/index.mjs --mode=production --clean",
    "build-demo-apps": "demo-apps/build-demo-apps.sh",
    "build-sample-apps": "npm run build-demo-apps",
    "check-database-schema": "./build/index.mjs --mode=development --target=scripts/check-database-schema.ts && ./dist/scripts/check-database-schema.js --check",
    codegen: "node ./build/index.mjs --mode=development --target=scripts/generate-graphql-types.ts && node ./dist/scripts/generate-graphql-types.js && node ./scripts/generate-dayjs.mjs > opensource/sdk-js/packages/react/common/dayjs.ts",
    "docs-codegen": "./scripts/docs-codegen.sh",
    "local-dev": "./ops/local-dev.sh",
    watch: "./build/index.mjs --mode=development --clean && (./build/index.mjs --mode=development --watch --skipInitialBuild & npm run start-external-dev & npm run start-local-s3 & nodemon --config nodemon-server.json & nodemon --config nodemon-docs-server.json & npm run tsc)",
    "watch-external": "./build/index.mjs --mode=development --watch --target=external",
    "watch-server": "./build/index.mjs --mode=development --watch --target=server",
    "db-ssh-tunnel": "lsof -i '@localhost:15432' >/dev/null || ssh -f -N -L 15432:database-prod-read.int.cord.com:5432 zero",
    "db-ssh-tunnel-write": "lsof -i '@localhost:25432' >/dev/null || ssh -f -N -L 25432:database-prod.int.cord.com:5432 zero",
    "start-external-dev": "http-server ./dist/external -c-1 -a :: --silent --port 8179",
    "start-local-s3": "cat ./localhost/localhost.key ./localhost/localhost.crt > ./localhost/localhost.packed && cd ops && docker-compose up localstack",
    "start-postgres": ". ./.env && export POSTGRES_USER POSTGRES_DB POSTGRES_PORT POSTGRES_PASSWORD && cd ops && docker-compose up postgres",
    "start-redis": "cd ops && docker-compose up redis",
    "start-server-dev": 'NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" node -r dotenv/config --enable-source-maps ./dist/server/index.js',
    "start-server-dev-snapshots": 'NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" node -r dotenv/config --enable-source-maps --heapsnapshot-signal=SIGUSR2 ./dist/server/index.js',
    "start-server-prod": "node -r dotenv/config dist/generic/server/index.js",
    "start-asyncWorker-dev": "node -r dotenv/config --enable-source-maps ./dist/asyncWorker/asyncWorker.js",
    "start-asyncWorker-prod": "node -r dotenv/config dist/generic/asyncWorker/asyncWorker.js",
    "start-docs-server-dev": 'NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" node -r dotenv/config --enable-source-maps ./dist/docs/server/index.js',
    "start-docs-server-prod": "node -r dotenv/config dist/generic/docs/server/index.js",
    tsc: "tsc --incremental false --noEmit --skipLibCheck --watch --preserveWatchOutput",
    "tsc-once": "tsc --incremental false --noEmit --skipLibCheck",
    "wipe-postgres": "cd ops && POSTGRES_USER= POSTGRES_DB= POSTGRES_PASSWORD= docker-compose down --volumes",
    install: "find node_modules/@sentry/ -type f -print0 | grep -z -E '\\.(js|js\\.map|d\\.ts)$' | if sed --version >/dev/null 2>&1 ; then xargs -0 sed --in-place 's/\\b__SENTRY__\\b/_CORDSNTRY/g;'; else xargs -0 sed -i '' -E 's/[[:<:]]__SENTRY__[[:>:]]/_CORDSNTRY/g;'; fi",
    postinstall: "patch-package",
    repl: "./build/index.mjs --mode=development --target=repl && node ./dist/repl/index.js",
    "generate-docs-embeddings": "./build/index.mjs --mode=development --target=scripts/docs-generate-search-data.ts && ./dist/scripts/docs-generate-search-data.js",
    "extract-demo-apps-to-sandpack-object": "./build/index.mjs --mode=development --target=scripts/extract-demo-apps-to-sandpack-file-object.ts && ./dist/scripts/extract-demo-apps-to-sandpack-file-object.js",
    prepare: '[ "$(git config core.hooksPath)" = ".githooks" ] && git config --unset core.hooksPath ; ln -s ../../.githooks/prepare-commit-msg .git/hooks/ > /dev/null 2>&1 || true'
  },
  jest: {
    extensionsToTreatAsEsm: [
      ".ts",
      ".tsx",
      ".graphql"
    ],
    transform: {
      "^.+\\.(tsx?$)|(js$)|(graphql$)": "<rootDir>/jest/transformer.mjs"
    },
    resolver: "<rootDir>/jest/resolver.cjs",
    moduleDirectories: [
      "<rootDir>",
      "node_modules"
    ],
    setupFiles: [
      "<rootDir>/jest/setup-jest-env.js"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/screenshotsDiff",
      "<rootDir>/opensource/"
    ],
    transformIgnorePatterns: [
      "/node_modules/"
    ]
  },
  workspaces: [
    "opensource/sdk-js/packages/*"
  ],
  dependencies: {
    "@apollo/client": "~3.10.4",
    "@auth0/auth0-react": "^1.8.0",
    "@aws-sdk/client-auto-scaling": "^3.363.0",
    "@aws-sdk/client-cloudfront": "^3.363.0",
    "@aws-sdk/client-cloudwatch-logs": "^3.363.0",
    "@aws-sdk/client-ec2": "^3.363.0",
    "@aws-sdk/client-ecr": "^3.363.0",
    "@aws-sdk/client-elastic-load-balancing-v2": "^3.363.0",
    "@aws-sdk/client-iam": "^3.363.0",
    "@aws-sdk/client-s3": "^3.363.0",
    "@aws-sdk/client-secrets-manager": "^3.363.0",
    "@aws-sdk/credential-provider-node": "^3.363.0",
    "@codesandbox/sandpack-react": "^2.6.9",
    "@emotion/react": "^11.11.1",
    "@emotion/server": "^11.10.0",
    "@emotion/styled": "^11.11.0",
    "@floating-ui/react-dom": "^1.3.0",
    "@giphy/js-fetch-api": "^5.4.0",
    "@giphy/react-components": "^9.4.1",
    "@graphql-tools/schema": "^8.5.0",
    "@graphql-tools/utils": "^8.13.1",
    "@heroicons/react": "^2.0.18",
    "@launchdarkly/node-server-sdk": "^8.2.4",
    "@leeoniya/ufuzzy": "^0.7.0",
    "@material-ui/core": "^4.12.4",
    "@material-ui/styles": "^4.11.5",
    "@mui/material": "^5.13.7",
    "@phosphor-icons/react": "^2.0.15",
    "@pyroscope/nodejs": "^0.3.11",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@segment/analytics-node": "^2.0.0",
    "@sendgrid/mail": "^8.1.0",
    "@sentry/browser": "^7.57.0",
    "@sentry/node": "^7.59.3",
    "@sentry/react": "^7.57.0",
    "@sentry/tracing": "^7.59.3",
    "@sentry/types": "^7.59.3",
    "@slack/events-api": "^3.0.1",
    "@slack/web-api": "6.11.1",
    "@slack/webhook": "^7.0.2",
    "@tanstack/react-query": "^4.32.6",
    "@tanstack/react-virtual": "^3.5.0",
    "@types/blueimp-md5": "^2.7.0",
    "@types/emoji-js": "^3.5.2",
    "@types/jsdom": "^16.2.5",
    "@types/parse5": "^7.0.0",
    "@types/ua-parser-js": "^0.7.36",
    "@types/valid-data-url": "^2.0.0",
    "@types/wcag-contrast": "^3.0.0",
    ajv: "^8.11.0",
    "ajv-formats": "^2.1.1",
    "apollo-server-core": "^3.12.1",
    "apollo-server-express": "^3.12.1",
    "at-least-node": "^1.0.0",
    auth0: "^3.7.2",
    axios: "^1.6.8",
    backo2: "^1.0.2",
    bluebird: "^3.7.2",
    "blueimp-md5": "^2.18.0",
    buffer: "^5.6.0",
    cheerio: "^1.0.0-rc.12",
    classnames: "^2.5.1",
    cookie: "^0.4.1",
    "cookie-parser": "^1.4.6",
    cors: "^2.8.5",
    dataloader: "^2.0.0",
    dayjs: "^1.11.11",
    dockerode: "^3.3.0",
    dotenv: "^8.2.0",
    "email-addresses": "^5.0.0",
    "emoji-js": "^3.8.0",
    "emoji-picker-element": "^1.16.0",
    express: "^4.19.2",
    "express-basic-auth": "^1.2.0",
    "fast-json-stable-stringify": "^2.1.0",
    "form-data": "^3.0.1",
    "framer-motion": "^6.5.1",
    "free-email-domains": "^1.2.4",
    graphql: "^15.8.0",
    "graphql-iso-date": "^3.6.1",
    "graphql-redis-subscriptions": "^2.5.0",
    "graphql-subscriptions": "^2.0.0",
    "graphql-tag": "^2.12.6",
    "graphql-type-json": "^0.3.2",
    "graphql-type-uuid": "^0.2.0",
    handlebars: "^4.7.7",
    highcharts: "^10.2.1",
    "highcharts-react-official": "^3.1.0",
    "html-entities": "^2.1.0",
    i18next: "^23.8.2",
    ioredis: "^5.2.2",
    "ipaddr.js": "^2.2.0",
    "is-hotkey": "^0.2.0",
    iterall: "^1.3.0",
    jose: "^4.15.5",
    jotai: "^2.6.3",
    "js-base64": "^3.7.7",
    jsdom: "^24.0.0",
    jsonwebtoken: "^9.0.2",
    jss: "^10.9.0",
    "jwks-rsa": "^2.0.5",
    "jwt-encode": "^1.0.1",
    "linkify-react": "^4.1.3",
    linkifyjs: "^4.1.3",
    "markdown-to-jsx": "^7.4.0",
    multer: "^1.4.4-lts.1",
    nanoid: "^3.3.6",
    "neat-csv": "^7.0.0",
    "node-cache": "^5.1.2",
    "node-email-reply-parser": "^0.1.4",
    "node-fetch": "^3.3.2",
    oauth: "^0.9.15",
    open: "^8.4.2",
    openai: "^4.22.0",
    parse5: "^7.1.2",
    "patch-package": "^6.5.1",
    pg: "^8.11.5",
    "pg-boss": "^8.4.2",
    "pg-copy-streams": "^5.1.1",
    "prom-client": "^15.1.2",
    "query-string": "^7.1.3",
    querystring: "^0.2.0",
    radash: "^11.0.0",
    react: "^18.2.0",
    "react-bootstrap": "^1.6.6",
    "react-country-region-selector": "^3.6.1",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-i18next": "^13.2.2",
    "react-jss": "^10.9.0",
    "react-markdown": "^8.0.5",
    "react-popper": "^2.3.0",
    "react-router-dom": "^6.8.2",
    "react-sticky-box": "^2.0.5",
    "react-syntax-highlighter": "^15.5.0",
    "react-window": "^1.8.10",
    redlock: "^v5.0.0-beta.2",
    "reflect-metadata": "^0.1.13",
    "response-time": "^2.3.2",
    sequelize: "^6.37.0",
    "sequelize-cli": "^6.6.1",
    "sequelize-typescript": "^2.1.6",
    "serialize-error": "^11.0.3",
    "sha.js": "^2.4.11",
    sharp: "^0.32.6",
    "slack-markdown": "0.1.1",
    slate: "^0.100.0",
    "slate-history": "^0.100.0",
    "slate-hyperscript": "^0.100.0",
    "slate-react": "^0.100.1",
    stripe: "^15.4.0",
    "subscriptions-transport-ws": "^0.9.19",
    supertest: "^6.1.6",
    "typed-emitter": "^1.3.1",
    "ua-parser-js": "^1.0.33",
    url: "^0.11.0",
    "url-pattern": "^1.0.3",
    "use-sync-external-store": "^1.2.0",
    uuid: "^8.3.2",
    "valid-data-url": "^3.0.0",
    validator: "^13.7.0",
    "wcag-contrast": "^3.0.0",
    winston: "^3.7.2",
    "winston-cloudwatch": "^6.2.0",
    "winston-transport": "^4.5.0",
    ws: "^7.5.3"
  },
  devDependencies: {
    "@cspell/eslint-plugin": "^6.31.1",
    "@luckycatfactory/esbuild-graphql-loader": "^3.7.0",
    "@microsoft/tsdoc": "^0.14.2",
    "@sentry/cli": "^2.10.0",
    "@types/analytics-node": "^3.1.5",
    "@types/auth0": "^3.3.3",
    "@types/backo2": "^1.0.1",
    "@types/bluebird": "^3.5.32",
    "@types/chrome": "^0.0.112",
    "@types/cookie": "^0.4.0",
    "@types/cookie-parser": "^1.4.3",
    "@types/dockerode": "^3.2.6",
    "@types/express": "^4.17.14",
    "@types/jest": "^29.5.3",
    "@types/jscodeshift": "^0.11.6",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/multer": "^1.4.7",
    "@types/node": "^14.18.54",
    "@types/oauth": "^0.9.1",
    "@types/pg": "^8.11.5",
    "@types/pg-copy-streams": "^1.2.1",
    "@types/query-string": "^6.3.0",
    "@types/react": "^18.2.25",
    "@types/react-dom": "^18.2.18",
    "@types/react-helmet": "^6.1.6",
    "@types/react-syntax-highlighter": "^15.5.6",
    "@types/react-window": "^1.8.8",
    "@types/response-time": "^2.3.5",
    "@types/sha.js": "^2.4.0",
    "@types/supertest": "^2.0.11",
    "@types/uuid": "^8.3.4",
    "@types/validator": "^13.7.3",
    "@types/ws": "^7.2.5",
    "@typescript-eslint/eslint-plugin": "^7.5.0",
    "@typescript-eslint/parser": "^7.5.0",
    "@vanilla-extract/css": "^1.15.2",
    "@vanilla-extract/esbuild-plugin": "^2.2.2",
    chokidar: "^3.5.3",
    csstype: "^3.1.3",
    esbuild: "^0.21.3",
    "esbuild-plugin-svgr": "0.0.1",
    eslint: "^8.31.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-cypress": "^2.12.1",
    "eslint-plugin-i18next": "^6.0.3",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-jest": "^27.9.0",
    "eslint-plugin-no-lookahead-lookbehind-regexp": "^0.1.0",
    "eslint-plugin-no-relative-import-paths": "^v1.5.2",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "fake-indexeddb": "^3.1.7",
    glob: "^10.3.10",
    "http-server": "^14.0.0",
    "ioredis-mock": "^7.4.0",
    jest: "^29.7.0",
    "jest-environment-jsdom": "^29.6.1",
    jscodeshift: "^0.14.0",
    "lint-staged": "12.3.5",
    nodemon: "^3.0.1",
    "pg-formatter": "^1.2.0",
    prettier: "^3.0.3",
    "schema-dts": "^1.1.2",
    "ts-prune": "latest",
    typescript: "~5.1.6",
    yargs: "^17.7.2"
  },
  overrides: {
    "@auth0/auth0-react": {
      react: "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "@material-ui/core": {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@types/react": "^18.2.18",
      "@types/react-dom": "^18.0.11"
    },
    "@material-ui/styles": {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@types/react": "^18.2.18"
    },
    "@sentry/cli": {
      "strip-ansi": "^7.0.1"
    },
    "@slack/events-api": {
      debug: "^3.1.0"
    },
    "apollo-server-express": {
      debug: "^3.1.0"
    },
    "eslint-plugin-import": {
      debug: "^3.1.0"
    },
    "graphql-iso-date": {
      graphql: "$graphql"
    },
    "graphql-postgres-subscriptions": {
      graphql: "$graphql"
    },
    "postgres-date": "2.1.0"
  }
};

// server/src/logging/prometheus.ts
import * as url from "url";
import * as prom from "prom-client";
var register = new prom.Registry();
if (process.env.CORD_WORKER_NAME) {
  const sanitizedWorkerName = process.env.CORD_WORKER_NAME.replace(
    /[^A-Za-z0-9 _-]/g,
    ""
  );
  register.setDefaultLabels({ worker: sanitizedWorkerName });
}
prom.AggregatorRegistry.setRegistries([register]);
prom.collectDefaultMetrics({
  register,
  prefix: `${"scripts_generate_customer_auth_token"}_`
});
var Counter2 = (configuration) => new prom.Counter({ registers: [register], ...configuration });
var Gauge2 = (configuration) => new prom.Gauge({ registers: [register], ...configuration });
var TimeHistogram = (configuration) => new prom.Histogram({
  registers: [register],
  buckets: logBuckets(1e-3, 10, 13),
  ...configuration
});
function logBuckets(min, max, buckets) {
  const logMin = Math.log10(min);
  const logMax = Math.log10(max);
  const step = (logMax - logMin) / (buckets - 1);
  return [...Array(buckets).keys()].map((i) => min * 10 ** (i * step));
}
var aggregatorRegistry = new prom.AggregatorRegistry();

// server/src/auth/index.ts
import { JwksClient } from "jwks-rsa";

// server/src/util/CordError.ts
var CordError = class extends Error {
  constructor(message, loggingMetadata, loggingTags) {
    super(message);
    this.loggingMetadata = loggingMetadata;
    this.loggingTags = loggingTags;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// server/src/entity/org_members/OrgMembersEntity.ts
import { Table as Table9, Column as Column9, Model as Model9 } from "sequelize-typescript";
import { DataTypes as DataTypes9 } from "sequelize";
var OrgMembersEntity = class extends Model9 {
};
__decorateClass([
  Column9({
    type: DataTypes9.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgMembersEntity.prototype, "userID", 2);
__decorateClass([
  Column9({
    type: DataTypes9.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgMembersEntity.prototype, "orgID", 2);
__decorateClass([
  Column9({
    type: DataTypes9.UUID,
    allowNull: true
  })
], OrgMembersEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column9({
    type: DataTypes9.TIME
  })
], OrgMembersEntity.prototype, "createdTimestamp", 2);
OrgMembersEntity = __decorateClass([
  Table9({
    tableName: "org_members",
    timestamps: false
  })
], OrgMembersEntity);

// server/src/auth/index.ts
var SERVICE_USER_ID = "service_user";
var jwksClient = new JwksClient({
  jwksUri: `https://${Env_default.AUTH0_CUSTOM_LOGIN_DOMAIN}/.well-known/jwks.json`
});
var Viewer = class _Viewer {
  constructor(userID, orgID, platformApplicationID, externalUserID, externalOrgID, developerUserID, originalOrgID, relevantOrgIDs) {
    this.userID = userID;
    this.orgID = orgID;
    this.platformApplicationID = platformApplicationID;
    this.externalUserID = externalUserID;
    this.externalOrgID = externalOrgID;
    this.developerUserID = developerUserID;
    this.originalOrgID = originalOrgID;
    this.relevantOrgIDs = relevantOrgIDs;
    if (orgID !== void 0 && relevantOrgIDs !== void 0) {
      if (relevantOrgIDs.length !== 1 || relevantOrgIDs[0] !== orgID) {
        throw new Error(
          "You specified both a single orgID and relevantOrgIDs. You should pass undefined for the orgID to catch places not using relevantOrgIDs. Be bold!"
        );
      }
    } else if (orgID !== void 0) {
      this.relevantOrgIDs = [orgID];
    }
  }
  static async createLoggedInPlatformViewer({
    user,
    org
  }) {
    if (!user.platformApplicationID) {
      throw new Error("Platform viewer must have platformApplicationID");
    }
    const relevantOrgIDs = org ? void 0 : (
      // OrgMembersLoader.loadAllImmediateOrgIDsForUser but we can't call that since we
      // don't have a viewer yet!
      (await OrgMembersEntity.findAll({
        where: {
          userID: user.id
        }
      })).map((e) => e.orgID)
    );
    return new _Viewer(
      user.id,
      org?.id,
      user.platformApplicationID,
      user.externalID,
      org?.externalID,
      void 0,
      void 0,
      relevantOrgIDs
    );
  }
  static createLoggedInViewer(userID, orgID) {
    return new _Viewer(userID, orgID);
  }
  static createOrgViewer(orgID, platformApplicationID) {
    return new _Viewer(void 0, orgID, platformApplicationID);
  }
  static createServiceViewer() {
    return new _Viewer(SERVICE_USER_ID, void 0);
  }
  static createAnonymousViewer() {
    return new _Viewer(void 0, void 0);
  }
  static createConsoleViewer(devUserID) {
    return new _Viewer(
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      devUserID
    );
  }
  static createFromSerializedState(serializedViewer) {
    const {
      userID,
      orgID,
      platformApplicationID,
      externalUserID,
      externalOrgID,
      developerUserID,
      originalOrgID,
      relevantOrgIDs,
      ...rest
    } = serializedViewer;
    const _ = rest;
    return new _Viewer(
      userID,
      orgID,
      platformApplicationID,
      externalUserID,
      externalOrgID,
      developerUserID,
      originalOrgID,
      relevantOrgIDs
    );
  }
  /**
   * Returns a version of this Viewer with the orgID set to the given org ID,
   * used in situations where a user logged into one org wants to take an action
   * as themselves in another org, such as sending a message from the unified
   * inbox.  If the orgID given is the same as this Viewer's org ID, just
   * returns this Viewer again.
   */
  viewerInOtherOrg(orgID, externalOrgID, relevantOrgIDs) {
    if (orgID === this.orgID && orgID !== void 0) {
      return this;
    }
    if (orgID === void 0 && relevantOrgIDs === void 0) {
      throw new Error("viewerInOtherOrg provided with no orgs at all");
    }
    return new _Viewer(
      this.userID,
      orgID,
      this.platformApplicationID,
      this.externalUserID,
      externalOrgID,
      this.developerUserID,
      this.originalOrgID ?? this.orgID,
      relevantOrgIDs
    );
  }
};
var assertViewerHasIdentity = (viewer) => {
  if (!viewer.userID || !viewer.orgID) {
    throw new Error("Viewer must not be anonymous.");
  }
  return {
    userID: viewer.userID,
    orgID: viewer.orgID
  };
};
function assertViewerHasUser(viewer) {
  const { userID } = viewer;
  if (!userID) {
    throw new Error("Viewer user must not be anonymous.");
  }
  return userID;
}
function assertViewerHasOrg(viewer) {
  const { orgID } = viewer;
  if (!orgID) {
    throw new Error("Viewer org must not be anonymous.");
  }
  return orgID;
}
function assertViewerHasPlatformApplicationID(viewer) {
  const { platformApplicationID } = viewer;
  if (!platformApplicationID) {
    throw new Error("Viewer must have a platform app ID");
  }
  return platformApplicationID;
}

// server/src/logging/Logger.ts
var logLevel = Env_default.LOGLEVEL;
var defaultMeta = {
  process: "scripts_generate_customer_auth_token",
  serverVersion: package_default.version,
  serverGitCommit: process.env.COMMIT_HASH || process.env.npm_package_gitHead,
  serverHost: hostname()
};
if (process.env.CORD_WORKER_NAME) {
  defaultMeta.workerName = process.env.CORD_WORKER_NAME;
}
var sentryLogging = false;
if (sentryLogging) {
  Sentry.init({
    dsn: void 0,
    environment: Env_default.SENTRY_ENVIRONMENT,
    release: Env_default.SENTRY_RELEASE,
    tracesSampleRate: parseFloat(Env_default.SENTRY_TRACE_SAMPLE_RATE ?? "0"),
    attachStacktrace: true,
    normalizeDepth: 10
  });
}
var winstonLogger = winston.createLogger({ defaultMeta });
winstonLogger.add(
  new winston.transports.Console({
    level: logLevel,
    format: winston.format.combine(winston.format.timestamp(), flatFormat()),
    handleExceptions: true
  })
);
var counter = Counter2({
  name: "ServerLogging",
  help: "Number of log messages emitted by server",
  labelNames: ["level"]
});
var LEVEL = Symbol.for("level");
var MetricLogger = class extends Transport {
  log(info, next) {
    counter.inc({ level: info[LEVEL] });
    next();
  }
};
winstonLogger.add(new MetricLogger({ level: "silly" }));
var winstonCW = void 0;
if (Env_default.CLOUDWATCH_LOGLEVEL && !process.env.IS_TEST) {
  if (!Env_default.CLOUDWATCH_LOG_GROUP_NAME) {
    throw new Error(
      `CloudWatch logging is enabled (CLOUDWATCH_LOGLEVEL is set), so
       CLOUDWATCH_LOG_GROUP_NAME must be provided, too!`
    );
  }
  const defaultStreamName = () => `${(/* @__PURE__ */ new Date()).toISOString().replace(/:/g, ".")} ${userInfo().username} ${hostname()}(${process.pid})`;
  winstonCW = new WinstonCloudWatch({
    // "name" is optional with default value "CloudWatch" but the
    // typedefinition has name as required. See
    // https://githubmemory.com/repo/lazywithclass/winston-cloudwatch/issues/155
    name: "CloudWatch",
    level: Env_default.CLOUDWATCH_LOGLEVEL,
    logGroupName: Env_default.CLOUDWATCH_LOG_GROUP_NAME,
    logStreamName: Env_default.CLOUDWATCH_LOG_STREAM_NAME || defaultStreamName(),
    awsRegion: Env_default.CLOUDWATCH_AWS_REGION,
    jsonMessage: true
  });
  winstonLogger.add(winstonCW);
} else {
  if (Env_default.CLOUDWATCH_LOG_GROUP_NAME || Env_default.CLOUDWATCH_LOG_STREAM_NAME) {
    throw new Error(
      `Some CLOUDWATCH_* variables are set, but CLOUDWATCH_LOGLEVEL is not.`
    );
  }
}
var SENTRY_LOG_LEVEL = {
  error: "error",
  warn: "warning"
};
var cleanupSequelizeError = (error) => {
  const suberrors = error.errors;
  if (Array.isArray(suberrors)) {
    suberrors.forEach((error2) => delete error2.instance);
  }
};
var MAX_ORG_IDS_TO_LOG = 50;
var Logger = class _Logger {
  constructor(viewer, additionalMeta) {
    /**
      Useful when dealing with promises:
    
      ```
      promise.catch(exceptionLogger('something broke'))
      ```
    */
    this.exceptionLogger = (message, meta, tags) => (error) => this.logException(
      message,
      error,
      { ...this.metadata, ...meta },
      tags,
      "error"
    );
    this.truncatedViewer = { ...viewer };
    this.metadata = { ...defaultMeta, ...additionalMeta };
    if (viewer.relevantOrgIDs && viewer.relevantOrgIDs.length > MAX_ORG_IDS_TO_LOG) {
      this.truncatedViewer.relevantOrgIDs = [
        ...viewer.relevantOrgIDs.slice(0, MAX_ORG_IDS_TO_LOG),
        `(truncated from ${viewer.relevantOrgIDs.length} orgs)`
      ];
    }
    void this.addAppName(viewer);
  }
  childLogger(viewer, additionalMeta) {
    return new _Logger(viewer, { ...this.metadata, ...additionalMeta });
  }
  viewerToLog() {
    return {
      ...this.truncatedViewer,
      ...this.appName && { appName: this.appName }
    };
  }
  log(level, message, meta, options) {
    if (sentryLogging && !process.env.IS_TEST) {
      const sentryLevel = SENTRY_LOG_LEVEL[level];
      if (sentryLevel) {
        const sentryEventID = Sentry.captureMessage(message, {
          level: sentryLevel,
          extra: { ...defaultMeta, ...meta },
          tags: { loggingProcessName: "scripts_generate_customer_auth_token" },
          fingerprint: options?.sentryFingerPrint,
          user: this.viewerToLog()
        });
        meta = { ...this.metadata, ...meta, sentryEventID };
      }
    }
    winstonLogger.log(level, message, {
      viewer: this.viewerToLog(),
      ...this.metadata,
      ...meta
    });
  }
  debug(message, meta, options) {
    this.log("debug", message, meta, options);
  }
  info(message, meta, options) {
    this.log("info", message, meta, options);
  }
  warn(message, meta, options) {
    this.log("warn", message, meta, options);
  }
  error(message, meta, options) {
    this.log("error", message, meta, options);
  }
  logLoggerInfo() {
    this.info(
      `Logging through winston. Console log level set to "${logLevel}", CloudWatch logging is ${Env_default.CLOUDWATCH_LOGLEVEL === void 0 ? "disabled" : `set to "${Env_default.CLOUDWATCH_LOGLEVEL}"`}`
    );
  }
  /**
    To be used imperatively:
  
    ```
    try {
      // ...
    } catch (e) {
      logException('something broke', e)
    }
    ```
  */
  logException(message, error, meta, tags, level = "error") {
    if (error.name?.startsWith("Sequelize")) {
      cleanupSequelizeError(error);
    }
    let serializedError = void 0;
    try {
      serializedError = serializeError(error, { maxDepth: 50 });
    } catch (e) {
      winstonLogger.log(
        level,
        `logException: serializeError threw an exception (${message})`,
        {
          error: `${error}`,
          viewer: this.viewerToLog(),
          ...this.metadata,
          ...meta
        }
      );
    }
    if (serializedError !== void 0) {
      if (!message) {
        try {
          message = `${serializedError.name}: ${serializedError.message}`;
        } catch (e) {
          message = `${serializedError}`;
        }
      }
      winstonLogger.log(level, message, {
        error: serializedError,
        viewer: this.viewerToLog(),
        ...this.metadata,
        ...meta
      });
    }
    if ((level === "warn" || level === "error") && !process.env.IS_TEST) {
      Sentry.withScope((scope) => {
        scope.setTags({
          ...error instanceof CordError && error.loggingTags,
          ...tags
        });
        if (serializedError && error instanceof CordError) {
          delete serializedError.loggingMetadata;
          delete serializedError.loggingTags;
        }
        scope.setExtra("error", serializedError);
        scope.setExtra("message", message);
        scope.setExtra("meta", {
          ...this.metadata,
          ...error instanceof CordError && error.loggingMetadata,
          ...meta
        });
        scope.setExtra("user", this.viewerToLog());
        Sentry.captureException(error, {
          level: SENTRY_LOG_LEVEL[level]
        });
      });
    }
  }
  async addAppName(viewer) {
    if (!viewer?.platformApplicationID) {
      return;
    }
    const app = await ApplicationEntity.findByPk(viewer.platformApplicationID);
    this.appName = app?.name;
  }
};
var _anonymousLogger = void 0;
function anonymousLogger() {
  if (_anonymousLogger === void 0) {
    _anonymousLogger = new Logger(Viewer.createAnonymousViewer());
  }
  return _anonymousLogger;
}

// server/src/files/upload.ts
dayjs2.extend(utc);
var {
  S3_ACCESS_KEY_ID,
  S3_ACCESS_KEY_SECRET,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_REGION,
  S3_PUBLIC_BUCKET
} = Env_default;
var defaultS3Bucket = {
  bucket: S3_BUCKET,
  region: S3_REGION
};
var credentials = null;
function getCredentials() {
  if (!credentials) {
    throw new Error("Link signing credentials not initialized");
  }
  return credentials;
}
var sha256 = (text) => crypto2.createHash("sha256").update(text).digest();
var hmac256 = (text, key) => crypto2.createHmac("sha256", key).update(text).digest();
var sortedEntries = (object) => Object.entries(object).sort(([key1], [key2]) => key1 < key2 ? -1 : 1);
var getSignedDownloadURL = (fileId, filename, config) => getSignedURL(fileId, DOWNLOAD_URL_TTL_SECONDS, config, "GET", void 0, {
  "response-content-disposition": `attachment; filename="${encodeURIComponent(
    filename
  )}"`
});
var getSignedUploadURL = (key, size, mimeType, config) => getSignedURL(key, UPLOAD_URL_TTL_SECONDS, config, "PUT", {
  "Content-Length": `${size}`,
  "Content-Type": mimeType
});
var getSignedDeleteURL = (key, config) => getSignedURL(key, DELETE_URL_TTL_SECONDS, config, "DELETE");
var getSignedURL = (key, expirationSeconds = 60, config = defaultS3Bucket, verb = "GET", additionalHeaders = {}, additionalQueryParams = {}) => {
  const credentials2 = config.accessKeyID && config.accessKeySecret ? {
    accessKeyId: config.accessKeyID,
    secretAccessKey: config.accessKeySecret
  } : getCredentials();
  let now = dayjs2().utc();
  if (expirationSeconds > 2 * 60) {
    now = now.second(0);
  }
  if (expirationSeconds > 2 * 60 * 60) {
    now = now.minute(0);
  }
  const time = now.format("YYYYMMDD[T]HHmmss[Z]");
  const date = now.format("YYYYMMDD");
  const s3Endpoint = S3_ENDPOINT.replace("<REGION>", config.region);
  const path = "/" + encodeRFC3986URIComponent(config.bucket) + "/" + key.split("/").map(encodeRFC3986URIComponent).join("/");
  const host = new URL(s3Endpoint).host;
  const headers = {
    host,
    ...additionalHeaders
  };
  const signedHeaders = Object.keys(headers).map((header) => header.toLowerCase()).sort().join(";");
  const credential = [
    credentials2.accessKeyId,
    date,
    config.region,
    "s3",
    "aws4_request"
  ].join("/");
  const query = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": credential,
    "X-Amz-Date": time,
    "X-Amz-Expires": `${expirationSeconds}`,
    "X-Amz-SignedHeaders": signedHeaders,
    ...additionalQueryParams
  };
  if (credentials2.sessionToken) {
    query["X-Amz-Security-Token"] = credentials2.sessionToken;
  }
  const canonicalQueryString = sortedEntries(query).map(
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Disabling for pre-existing problems. Please do not copy this comment, and consider fixing this one!
    ([key2, value]) => `${encodeRFC3986URIComponent(key2)}=${encodeRFC3986URIComponent(value)}`
  ).join("&");
  const canonicalHeaders = sortedEntries(headers).map(([key2, value]) => `${key2.toLowerCase()}:${value.trim()}
`).join("");
  const canonicalRequestString = [
    verb,
    path,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    "UNSIGNED-PAYLOAD"
  ].join("\n");
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    time,
    [date, config.region, "s3", "aws4_request"].join("/"),
    sha256(canonicalRequestString).toString("hex")
  ].join("\n");
  const dateKey = hmac256(date, "AWS4" + credentials2.secretAccessKey);
  const regionKey = hmac256(config.region, dateKey);
  const serviceKey = hmac256("s3", regionKey);
  const signingKey = hmac256("aws4_request", serviceKey);
  const signature = hmac256(stringToSign, signingKey).toString("hex");
  return `${s3Endpoint}${path}?${canonicalQueryString}&X-Amz-Signature=${signature}`;
};
function encodeRFC3986URIComponent(str) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

// server/src/entity/s3_bucket/S3BucketLoader.ts
import DataLoader from "dataloader";

// server/src/entity/s3_bucket/S3BucketEntity.ts
import * as crypto3 from "crypto";
import { Table as Table10, Column as Column10, Model as Model10 } from "sequelize-typescript";
import { DataTypes as DataTypes10 } from "sequelize";
var S3BucketEntity = class extends Model10 {
  // encrypted
  getS3BucketConfig_DO_NOT_EXPOSE_TO_CLIENT() {
    const [encrypted, authTag, iv] = this.accessKeySecret.split(":");
    const decipher = crypto3.createDecipheriv(
      "aes-256-gcm",
      Env_default.PLATFORM_SECRETS_ENCRYPTION_KEY,
      Buffer.from(iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final();
    return {
      bucket: this.name,
      region: this.region,
      accessKeyID: this.accessKeyID,
      accessKeySecret: decrypted
    };
  }
};
__decorateClass([
  Column10({
    type: DataTypes10.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes10.UUIDV4
  })
], S3BucketEntity.prototype, "id", 2);
__decorateClass([
  Column10({
    type: DataTypes10.TEXT,
    allowNull: false
  })
], S3BucketEntity.prototype, "name", 2);
__decorateClass([
  Column10({
    type: DataTypes10.TEXT,
    allowNull: false
  })
], S3BucketEntity.prototype, "region", 2);
__decorateClass([
  Column10({
    type: DataTypes10.TEXT,
    allowNull: false
  })
], S3BucketEntity.prototype, "accessKeyID", 2);
__decorateClass([
  Column10({
    type: DataTypes10.TEXT,
    allowNull: false
  })
], S3BucketEntity.prototype, "accessKeySecret", 2);
S3BucketEntity = __decorateClass([
  Table10({
    tableName: "s3_buckets",
    timestamps: false
  })
], S3BucketEntity);

// server/src/entity/base/util.ts
function indexedMap(entities, f) {
  const m = /* @__PURE__ */ new Map();
  entities.forEach((e) => m.set(f(e), e));
  return m;
}
function inKeyOrder(entities, keys) {
  return inKeyOrderCustom(entities, keys, (e) => e.id);
}
function inKeyOrderCustom(entities, keys, f) {
  const m = indexedMap(entities, f);
  return keys.map((k) => m.get(k) ?? null);
}
function inKeyOrderOrNull(entities, keys) {
  return inKeyOrderOrNullCustom(entities, keys, (e) => e.id);
}
function inKeyOrderOrNullCustom(entities, keys, f) {
  const m = indexedMap(entities, f);
  return keys.map((k) => m.get(k) ?? null);
}

// server/src/entity/s3_bucket/S3BucketLoader.ts
var S3BucketLoader = class {
  constructor(viewer) {
    this.viewer = viewer;
    this.dataloader = new DataLoader(
      async (keys) => {
        const buckets = await S3BucketEntity.findAll({
          where: {
            id: keys
          }
        });
        return inKeyOrder(buckets, keys);
      },
      { cache: false }
    );
  }
  async load(id) {
    try {
      return await this.dataloader.load(id);
    } catch (e) {
      anonymousLogger().logException("S3Bucket dataloader error", e);
      return null;
    }
  }
  async loadAll() {
    return await S3BucketEntity.findAll();
  }
  async loadForApplication(application) {
    if (application.customS3Bucket) {
      return await this.load(application.customS3Bucket);
    } else {
      return null;
    }
  }
};

// server/src/files/download.ts
import * as crypto4 from "crypto";
function encodeFileProxyToken(payload) {
  const data = JSON.stringify({
    ...payload,
    time: Date.now()
  });
  const iv = crypto4.randomBytes(12);
  const cipher = crypto4.createCipheriv(
    "aes-256-gcm",
    Env_default.FILE_PROXY_SIGNING_SECRET_KEY,
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final()
  ]);
  const authTag = cipher.getAuthTag();
  return [
    "v1",
    encrypted.toString("hex"),
    authTag.toString("hex"),
    iv.toString("hex")
  ].join(":");
}

// server/src/entity/file/FileEntity.ts
var FileEntity = class extends Model11 {
  // URL that points to S3, expires after 24 hours
  async getSignedDownloadURL(s3BucketLoader = new S3BucketLoader(
    Viewer.createAnonymousViewer()
  )) {
    const s3Bucket = this.s3Bucket ? await s3BucketLoader.load(this.s3Bucket) : void 0;
    return getSignedDownloadURL(
      this.id,
      this.name,
      s3Bucket?.getS3BucketConfig_DO_NOT_EXPOSE_TO_CLIENT()
    );
  }
  // URL that points to our FileProxyHandler, never expires
  getPermanentDownloadURL() {
    return `${API_ORIGIN}/file?token=${encodeURIComponent(
      encodeFileProxyToken({
        id: this.id
      })
    )}`;
  }
  async getSignedUploadURL(s3BucketLoader = new S3BucketLoader(
    Viewer.createAnonymousViewer()
  )) {
    const s3Bucket = this.s3Bucket ? await s3BucketLoader.load(this.s3Bucket) : void 0;
    return getSignedUploadURL(
      this.id,
      this.size,
      this.mimeType,
      s3Bucket?.getS3BucketConfig_DO_NOT_EXPOSE_TO_CLIENT()
    );
  }
  async getDeleteURL(s3BucketLoader = new S3BucketLoader(
    Viewer.createAnonymousViewer()
  )) {
    const s3Bucket = this.s3Bucket ? await s3BucketLoader.load(this.s3Bucket) : void 0;
    return getSignedDeleteURL(
      this.id,
      s3Bucket?.getS3BucketConfig_DO_NOT_EXPOSE_TO_CLIENT()
    );
  }
};
__decorateClass([
  PrimaryKey5,
  Column11({
    defaultValue: DataTypes11.UUIDV4,
    type: DataTypes11.UUID
  })
], FileEntity.prototype, "id", 2);
__decorateClass([
  Column11({
    type: DataTypes11.UUID
  })
], FileEntity.prototype, "userID", 2);
__decorateClass([
  Column11({
    type: DataTypes11.UUID,
    allowNull: false
  })
], FileEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column11({
    type: DataTypes11.STRING
  })
], FileEntity.prototype, "name", 2);
__decorateClass([
  Column11({
    type: DataTypes11.STRING
  })
], FileEntity.prototype, "mimeType", 2);
__decorateClass([
  Column11({
    type: DataTypes11.INTEGER
  })
], FileEntity.prototype, "size", 2);
__decorateClass([
  Column11({
    type: DataTypes11.TIME
  })
], FileEntity.prototype, "timestamp", 2);
__decorateClass([
  Column11({
    type: DataTypes11.STRING
  })
], FileEntity.prototype, "uploadStatus", 2);
__decorateClass([
  Column11({
    type: DataTypes11.UUID
  })
], FileEntity.prototype, "s3Bucket", 2);
FileEntity = __decorateClass([
  Table11({
    tableName: "files",
    timestamps: false
  })
], FileEntity);

// server/src/entity/message_attachment/MessageAttachmentEntity.ts
import { Table as Table12, Column as Column12, PrimaryKey as PrimaryKey6, Model as Model12 } from "sequelize-typescript";
import { DataTypes as DataTypes12 } from "sequelize";
var MessageAttachmentEntity = class extends Model12 {
  getFileIDs() {
    switch (this.type) {
      case "file" /* FILE */:
        return [this.data.fileID];
      case "annotation" /* ANNOTATION */: {
        const data = this.data;
        return [data.blurredScreenshotFileID, data.screenshotFileID].filter(
          isDefined
        );
      }
      case "screenshot" /* SCREENSHOT */: {
        const data = this.data;
        return [data.blurredScreenshotFileID, data.screenshotFileID].filter(
          isDefined
        );
      }
      default:
        return [];
    }
  }
};
__decorateClass([
  PrimaryKey6,
  Column12({
    defaultValue: DataTypes12.UUIDV4,
    type: DataTypes12.UUID
  })
], MessageAttachmentEntity.prototype, "id", 2);
__decorateClass([
  Column12({
    type: DataTypes12.UUID
  })
], MessageAttachmentEntity.prototype, "messageID", 2);
__decorateClass([
  Column12({
    type: DataTypes12.STRING
  })
], MessageAttachmentEntity.prototype, "type", 2);
__decorateClass([
  Column12({
    defaultValue: {},
    type: DataTypes12.JSONB
  })
], MessageAttachmentEntity.prototype, "data", 2);
__decorateClass([
  Column12({
    type: DataTypes12.TIME
  })
], MessageAttachmentEntity.prototype, "timestamp", 2);
MessageAttachmentEntity = __decorateClass([
  Table12({
    tableName: "message_attachments",
    timestamps: false
  })
], MessageAttachmentEntity);

// server/src/entity/message_reaction/MessageReactionEntity.ts
import { Table as Table13, Column as Column13, PrimaryKey as PrimaryKey7, Model as Model13 } from "sequelize-typescript";
import { DataTypes as DataTypes13 } from "sequelize";
var REACTION_MAX_LENGTH = 127;
var MessageReactionEntity = class extends Model13 {
};
__decorateClass([
  PrimaryKey7,
  Column13({
    type: DataTypes13.UUID,
    defaultValue: DataTypes13.UUIDV4
  })
], MessageReactionEntity.prototype, "id", 2);
__decorateClass([
  Column13({
    type: DataTypes13.UUID
  })
], MessageReactionEntity.prototype, "userID", 2);
__decorateClass([
  Column13({
    type: DataTypes13.UUID
  })
], MessageReactionEntity.prototype, "messageID", 2);
__decorateClass([
  Column13({
    type: DataTypes13.TEXT,
    validate: {
      len: [1, REACTION_MAX_LENGTH]
    }
  })
], MessageReactionEntity.prototype, "unicodeReaction", 2);
__decorateClass([
  Column13({
    type: DataTypes13.TIME
  })
], MessageReactionEntity.prototype, "timestamp", 2);
MessageReactionEntity = __decorateClass([
  Table13({
    tableName: "message_reactions",
    timestamps: false
  })
], MessageReactionEntity);

// server/src/entity/message_mention/MessageMentionEntity.ts
import { Table as Table14, Column as Column14, Model as Model14 } from "sequelize-typescript";
import { DataTypes as DataTypes14 } from "sequelize";
var MessageMentionEntity = class extends Model14 {
};
__decorateClass([
  Column14({
    type: DataTypes14.UUID,
    primaryKey: true
  })
], MessageMentionEntity.prototype, "userID", 2);
__decorateClass([
  Column14({
    type: DataTypes14.UUID,
    primaryKey: true
  })
], MessageMentionEntity.prototype, "messageID", 2);
__decorateClass([
  Column14({
    type: DataTypes14.TIME
  })
], MessageMentionEntity.prototype, "timestamp", 2);
MessageMentionEntity = __decorateClass([
  Table14({
    tableName: "message_mentions",
    timestamps: false
  })
], MessageMentionEntity);

// server/src/entity/slack_channel/SlackChannelEntity.ts
import { Table as Table15, Column as Column15, Model as Model15 } from "sequelize-typescript";
import { DataTypes as DataTypes15 } from "sequelize";
var SlackChannelEntity = class extends Model15 {
};
__decorateClass([
  Column15({
    type: DataTypes15.UUID,
    primaryKey: true
  })
], SlackChannelEntity.prototype, "orgID", 2);
__decorateClass([
  Column15({
    type: DataTypes15.TEXT,
    primaryKey: true
  })
], SlackChannelEntity.prototype, "slackID", 2);
__decorateClass([
  Column15({
    type: DataTypes15.TEXT,
    allowNull: false
  })
], SlackChannelEntity.prototype, "name", 2);
__decorateClass([
  Column15({
    type: DataTypes15.BOOLEAN
  })
], SlackChannelEntity.prototype, "added", 2);
__decorateClass([
  Column15({
    type: DataTypes15.BOOLEAN
  })
], SlackChannelEntity.prototype, "archived", 2);
__decorateClass([
  Column15({
    type: DataTypes15.NUMBER,
    allowNull: false
  })
], SlackChannelEntity.prototype, "users", 2);
SlackChannelEntity = __decorateClass([
  Table15({
    tableName: "slack_channels",
    timestamps: false
  })
], SlackChannelEntity);

// server/src/entity/slack_message/SlackMessageEntity.ts
import { Table as Table16, Column as Column16, Model as Model16 } from "sequelize-typescript";
import { DataTypes as DataTypes16 } from "sequelize";
var SlackMessageEntity = class extends Model16 {
};
__decorateClass([
  Column16({
    type: DataTypes16.UUID
  })
], SlackMessageEntity.prototype, "slackOrgID", 2);
__decorateClass([
  Column16({
    type: DataTypes16.TEXT,
    primaryKey: true
  })
], SlackMessageEntity.prototype, "slackChannelID", 2);
__decorateClass([
  Column16({
    type: DataTypes16.TEXT,
    primaryKey: true
  })
], SlackMessageEntity.prototype, "slackMessageTimestamp", 2);
__decorateClass([
  Column16({
    type: DataTypes16.UUID
  })
], SlackMessageEntity.prototype, "messageID", 2);
__decorateClass([
  Column16({
    type: DataTypes16.UUID
  })
], SlackMessageEntity.prototype, "sharerOrgID", 2);
__decorateClass([
  Column16({
    type: DataTypes16.UUID
  })
], SlackMessageEntity.prototype, "sharerUserID", 2);
__decorateClass([
  Column16({
    type: DataTypes16.TIME
  })
], SlackMessageEntity.prototype, "timestamp", 2);
SlackMessageEntity = __decorateClass([
  Table16({
    tableName: "slack_messages",
    timestamps: false
  })
], SlackMessageEntity);

// server/src/entity/user_preference/UserPreferenceEntity.ts
import { Table as Table17, Column as Column17, Model as Model17 } from "sequelize-typescript";
import { DataTypes as DataTypes17 } from "sequelize";
var UserPreferenceEntity = class extends Model17 {
};
__decorateClass([
  Column17({
    type: DataTypes17.UUID,
    primaryKey: true
  })
], UserPreferenceEntity.prototype, "userID", 2);
__decorateClass([
  Column17({
    type: DataTypes17.TEXT,
    primaryKey: true
  })
], UserPreferenceEntity.prototype, "key", 2);
__decorateClass([
  Column17({
    type: DataTypes17.JSONB
  })
], UserPreferenceEntity.prototype, "value", 2);
UserPreferenceEntity = __decorateClass([
  Table17({
    tableName: "user_preferences",
    timestamps: false
  })
], UserPreferenceEntity);

// server/src/entity/task/TaskEntity.ts
import { Table as Table18, Column as Column18, Model as Model18, PrimaryKey as PrimaryKey8 } from "sequelize-typescript";
import { DataTypes as DataTypes18 } from "sequelize";
var TaskEntity = class extends Model18 {
};
__decorateClass([
  PrimaryKey8,
  Column18({
    defaultValue: DataTypes18.UUIDV4,
    type: DataTypes18.UUID,
    primaryKey: true
  })
], TaskEntity.prototype, "id", 2);
__decorateClass([
  Column18({
    type: DataTypes18.UUID
  })
], TaskEntity.prototype, "messageID", 2);
__decorateClass([
  Column18({
    type: DataTypes18.UUID
  })
], TaskEntity.prototype, "orgID", 2);
__decorateClass([
  Column18({
    type: DataTypes18.BOOLEAN
  })
], TaskEntity.prototype, "done", 2);
__decorateClass([
  Column18({
    type: DataTypes18.UUID
  })
], TaskEntity.prototype, "doneStatusLastUpdatedBy", 2);
__decorateClass([
  Column18({
    type: DataTypes18.TIME
  })
], TaskEntity.prototype, "timestamp", 2);
TaskEntity = __decorateClass([
  Table18({
    tableName: "tasks",
    timestamps: false
  })
], TaskEntity);

// server/src/entity/task_todo/TaskTodoEntity.ts
import { Table as Table19, Column as Column19, Model as Model19, PrimaryKey as PrimaryKey9 } from "sequelize-typescript";
import { DataTypes as DataTypes19 } from "sequelize";
var TaskTodoEntity = class extends Model19 {
};
__decorateClass([
  PrimaryKey9,
  Column19({
    defaultValue: DataTypes19.UUIDV4,
    type: DataTypes19.UUID,
    primaryKey: true
  })
], TaskTodoEntity.prototype, "id", 2);
__decorateClass([
  Column19({
    type: DataTypes19.UUID
  })
], TaskTodoEntity.prototype, "taskID", 2);
__decorateClass([
  Column19({
    type: DataTypes19.UUID
  })
], TaskTodoEntity.prototype, "orgID", 2);
__decorateClass([
  Column19({
    type: DataTypes19.BOOLEAN
  })
], TaskTodoEntity.prototype, "done", 2);
__decorateClass([
  Column19({
    type: DataTypes19.TIME
  })
], TaskTodoEntity.prototype, "timestamp", 2);
TaskTodoEntity = __decorateClass([
  Table19({
    tableName: "task_todos",
    timestamps: false
  })
], TaskTodoEntity);

// server/src/entity/task_assignee/TaskAssigneeEntity.ts
import { Table as Table20, Column as Column20, Model as Model20 } from "sequelize-typescript";
import { DataTypes as DataTypes20 } from "sequelize";
var TaskAssigneeEntity = class extends Model20 {
};
__decorateClass([
  Column20({
    type: DataTypes20.UUID,
    primaryKey: true
  })
], TaskAssigneeEntity.prototype, "taskID", 2);
__decorateClass([
  Column20({
    type: DataTypes20.UUID,
    primaryKey: true
  })
], TaskAssigneeEntity.prototype, "userID", 2);
__decorateClass([
  Column20({
    type: DataTypes20.UUID
  })
], TaskAssigneeEntity.prototype, "orgID", 2);
__decorateClass([
  Column20({
    type: DataTypes20.UUID
  })
], TaskAssigneeEntity.prototype, "assignerID", 2);
__decorateClass([
  Column20({
    type: DataTypes20.TIME
  })
], TaskAssigneeEntity.prototype, "timestamp", 2);
TaskAssigneeEntity = __decorateClass([
  Table20({
    tableName: "task_assignees",
    timestamps: false
  })
], TaskAssigneeEntity);

// server/src/entity/third_party_connection/ThirdPartyConnectionEntity.ts
import { Table as Table21, Column as Column21, Model as Model21 } from "sequelize-typescript";
import { DataTypes as DataTypes22 } from "sequelize";

// server/src/entity/common.ts
import { DataTypes as DataTypes21, Sequelize as Sequelize2 } from "sequelize";
var ThirdPartyConnectionDataType = DataTypes21.ENUM(
  "asana",
  "jira",
  "linear"
);
var MAX_IDS_PER_QUERY = 1e3;
function keyFor(userOrgID) {
  return `${userOrgID.userID}/${userOrgID.orgID}`;
}
function keyForPlatformID(platformID) {
  return `${platformID.platformApplicationID}/${platformID.externalID}`;
}

// server/src/entity/third_party_connection/ThirdPartyConnectionEntity.ts
var ThirdPartyConnectionEntity = class extends Model21 {
};
__decorateClass([
  Column21({ type: DataTypes22.UUID, primaryKey: true })
], ThirdPartyConnectionEntity.prototype, "userID", 2);
__decorateClass([
  Column21({ type: DataTypes22.UUID, primaryKey: true })
], ThirdPartyConnectionEntity.prototype, "orgID", 2);
__decorateClass([
  Column21({ type: ThirdPartyConnectionDataType, primaryKey: true })
], ThirdPartyConnectionEntity.prototype, "type", 2);
__decorateClass([
  Column21({ type: DataTypes22.TEXT })
], ThirdPartyConnectionEntity.prototype, "externalID", 2);
__decorateClass([
  Column21({ type: DataTypes22.TEXT })
], ThirdPartyConnectionEntity.prototype, "externalEmail", 2);
__decorateClass([
  Column21({ type: DataTypes22.JSONB })
], ThirdPartyConnectionEntity.prototype, "externalAuthData", 2);
__decorateClass([
  Column21({ type: DataTypes22.TIME })
], ThirdPartyConnectionEntity.prototype, "connectedTimestamp", 2);
ThirdPartyConnectionEntity = __decorateClass([
  Table21({
    tableName: "third_party_connections",
    timestamps: false
  })
], ThirdPartyConnectionEntity);

// server/src/entity/task_third_party_reference/TaskThirdPartyReferenceEntity.ts
import { Table as Table22, Column as Column22, Model as Model22 } from "sequelize-typescript";
import { DataTypes as DataTypes23, Op } from "sequelize";
var TaskThirdPartyReference = class extends Model22 {
  static async findForTask(taskID, externalConnectionType) {
    return await TaskThirdPartyReference.findOne({
      where: {
        taskID,
        taskTodoID: null,
        externalConnectionType
      }
    });
  }
  static async findAllForTask(taskID) {
    return await TaskThirdPartyReference.findAll({
      where: {
        taskID,
        taskTodoID: { [Op.is]: null }
      }
    });
  }
  static async findAllForTaskTodos(taskID, taskTodoIDs) {
    return await TaskThirdPartyReference.findAll({
      where: {
        taskID,
        taskTodoID: taskTodoIDs
      }
    });
  }
  static async findTaskWithExternalID(externalID, externalConnectionType) {
    return await TaskThirdPartyReference.findOne({
      where: {
        externalID,
        externalConnectionType,
        taskTodoID: { [Op.is]: null }
      }
    });
  }
};
__decorateClass([
  Column22({ type: DataTypes23.UUID, primaryKey: true })
], TaskThirdPartyReference.prototype, "taskID", 2);
__decorateClass([
  Column22({ type: DataTypes23.UUID })
], TaskThirdPartyReference.prototype, "taskTodoID", 2);
__decorateClass([
  Column22({ type: DataTypes23.TEXT, primaryKey: true })
], TaskThirdPartyReference.prototype, "externalID", 2);
__decorateClass([
  Column22({ type: ThirdPartyConnectionDataType, primaryKey: true })
], TaskThirdPartyReference.prototype, "externalConnectionType", 2);
__decorateClass([
  Column22({ type: DataTypes23.TEXT })
], TaskThirdPartyReference.prototype, "externalLocationID", 2);
__decorateClass([
  Column22({ type: DataTypes23.JSONB })
], TaskThirdPartyReference.prototype, "previewData", 2);
__decorateClass([
  Column22({ type: DataTypes23.BOOLEAN })
], TaskThirdPartyReference.prototype, "imported", 2);
TaskThirdPartyReference = __decorateClass([
  Table22({
    tableName: "task_third_party_references",
    timestamps: false
  })
], TaskThirdPartyReference);

// server/src/entity/page/PageEntity.ts
import { Table as Table23, Column as Column23, Model as Model23 } from "sequelize-typescript";
import { DataTypes as DataTypes24 } from "sequelize";
var PageEntity = class extends Model23 {
  get pageContext() {
    return {
      data: this.contextData,
      providerID: null
    };
  }
};
__decorateClass([
  Column23({
    type: DataTypes24.UUID,
    allowNull: false,
    primaryKey: true,
    unique: "orgID-providerID-contextHash-unique"
  })
], PageEntity.prototype, "orgID", 2);
__decorateClass([
  Column23({
    type: DataTypes24.UUID,
    allowNull: false,
    primaryKey: true,
    unique: "orgID-providerID-contextHash-unique"
  })
], PageEntity.prototype, "contextHash", 2);
__decorateClass([
  Column23({
    type: DataTypes24.JSONB,
    allowNull: false
  })
], PageEntity.prototype, "contextData", 2);
PageEntity = __decorateClass([
  Table23({
    tableName: "pages",
    timestamps: false
  })
], PageEntity);

// server/src/entity/thread/ThreadEntity.ts
import { Table as Table24, Column as Column24, Model as Model24 } from "sequelize-typescript";
import { DataTypes as DataTypes25, Sequelize as Sequelize3 } from "sequelize";

// server/src/entity/org_members/OrgMembersLoader.ts
import DataLoader3 from "dataloader";

// server/src/entity/org/OrgLoader.ts
import { Op as Op2 } from "sequelize";
import DataLoader2 from "dataloader";
var OrgLoader = class {
  constructor(viewer, cache = false) {
    this.viewer = viewer;
    this.platformOrgDataloader = new DataLoader2(
      async (keys) => {
        const orgsByApplication = /* @__PURE__ */ new Map();
        for (const key of keys) {
          if (!orgsByApplication.has(key.platformApplicationID)) {
            orgsByApplication.set(key.platformApplicationID, /* @__PURE__ */ new Set());
          }
          orgsByApplication.get(key.platformApplicationID).add(key.externalID);
        }
        const promises = [];
        for (const [platformApplicationID, orgIDSet] of orgsByApplication) {
          const externalOrgIDs = [...orgIDSet];
          for (let offset = 0; offset < externalOrgIDs.length; offset += MAX_IDS_PER_QUERY) {
            promises.push(
              OrgEntity.findAll({
                where: {
                  externalProvider: "platform" /* PLATFORM */,
                  platformApplicationID,
                  externalID: externalOrgIDs.slice(
                    offset,
                    offset + MAX_IDS_PER_QUERY
                  )
                }
              })
            );
          }
        }
        const orgs = (await Promise.all(promises)).flat();
        const index = /* @__PURE__ */ new Map();
        for (const org of orgs) {
          index.set(
            keyForPlatformID({
              platformApplicationID: org.platformApplicationID,
              externalID: org.externalID
            }),
            org
          );
        }
        return keys.map(
          (platformId) => index.get(keyForPlatformID(platformId)) ?? null
        );
      },
      { cache }
    );
    this.orgByIdDataloader = new DataLoader2(
      async (keys) => {
        const orgs = await OrgEntity.findAll({
          where: {
            id: keys
          }
        });
        return inKeyOrderOrNull(orgs, keys);
      },
      { cache }
    );
  }
  async loadOrg(id) {
    return await this.orgByIdDataloader.load(id);
  }
  async loadSlackOrg(slackTeamID, slackAppID) {
    const customSlackAppID = CORD_SLACK_APP_IDS.includes(slackAppID) ? null : slackAppID;
    return await OrgEntity.findOne({
      where: {
        externalProvider: "slack" /* SLACK */,
        externalID: slackTeamID,
        customSlackAppID,
        // Technically redundant, but allows postgres to use an index.
        platformApplicationID: null
      }
    });
  }
  async loadPlatformOrg(platformApplicationID, externalOrgID) {
    return await this.platformOrgDataloader.load({
      platformApplicationID,
      externalID: externalOrgID
    });
  }
  async loadByDomain(externalProvider, domain) {
    return await OrgEntity.findOne({
      where: { externalProvider, domain }
    });
  }
  async loadAllActiveSlackOrgs() {
    return await OrgEntity.findAll({
      where: {
        state: "active",
        externalProvider: "slack" /* SLACK */,
        externalAuthData: { [Op2.ne]: null }
      }
    });
  }
};

// server/src/entity/org_members/OrgMembersLoader.ts
var OrgMembersLoader = class {
  constructor(viewer) {
    this.viewer = viewer;
    this.dataloader = new DataLoader3(
      async (keys) => await this.loadBatch(keys),
      { cache: false }
    );
  }
  async loadBatch(keys, transaction) {
    const usersByOrg = /* @__PURE__ */ new Map();
    const orgsByUser = /* @__PURE__ */ new Map();
    for (const key of keys) {
      if (!usersByOrg.has(key.orgID)) {
        usersByOrg.set(key.orgID, /* @__PURE__ */ new Set());
      }
      usersByOrg.get(key.orgID).add(key.userID);
      if (!orgsByUser.has(key.userID)) {
        orgsByUser.set(key.userID, /* @__PURE__ */ new Set());
      }
      orgsByUser.get(key.userID).add(key.orgID);
    }
    const promises = [];
    if (usersByOrg.size < orgsByUser.size) {
      for (const [orgID, userIDSet] of usersByOrg) {
        const userIDs = [...userIDSet];
        for (let offset = 0; offset < userIDs.length; offset += MAX_IDS_PER_QUERY) {
          promises.push(
            OrgMembersEntity.findAll({
              where: {
                orgID,
                userID: userIDs.slice(offset, offset + MAX_IDS_PER_QUERY)
              },
              transaction
            })
          );
        }
      }
    } else {
      for (const [userID, orgIDSet] of orgsByUser) {
        const orgIDs = [...orgIDSet];
        for (let offset = 0; offset < orgIDs.length; offset += MAX_IDS_PER_QUERY) {
          promises.push(
            OrgMembersEntity.findAll({
              where: {
                userID,
                orgID: orgIDs.slice(offset, offset + MAX_IDS_PER_QUERY)
              },
              transaction
            })
          );
        }
      }
    }
    const orgMembers = (await Promise.all(promises)).flat();
    const index = /* @__PURE__ */ new Map();
    for (const orgMember of orgMembers) {
      index.set(
        keyFor({ userID: orgMember.userID, orgID: orgMember.orgID }),
        orgMember
      );
    }
    return keys.map((userOrgId) => index.get(keyFor(userOrgId)) ?? null);
  }
  async loadUserOrgMembership(userID, orgID, transaction) {
    try {
      const key = { userID, orgID };
      if (transaction) {
        return (await this.loadBatch([key], transaction))[0];
      } else {
        return await this.dataloader.load(key);
      }
    } catch (e) {
      anonymousLogger().logException("Org members dataloader error", e);
      return null;
    }
  }
  async viewerCanAccessOrg(orgID, transaction) {
    if ((this.viewer.relevantOrgIDs ?? []).includes(orgID)) {
      return true;
    }
    const userID = assertViewerHasUser(this.viewer);
    const membership = await this.loadUserOrgMembership(
      userID,
      orgID,
      transaction
    );
    return !!membership;
  }
  async viewerCanAccessOrgExternalID(externalOrgID) {
    const userID = assertViewerHasUser(this.viewer);
    const platformApplicationID = assertViewerHasPlatformApplicationID(
      this.viewer
    );
    const orgLoader = new OrgLoader(this.viewer);
    const org = await orgLoader.loadPlatformOrg(
      platformApplicationID,
      externalOrgID
    );
    if (!org) {
      return false;
    }
    const membership = await this.loadUserOrgMembership(userID, org.id);
    return !!membership;
  }
  // I.e. all orgs they are literally a member of, but not Slack connected orgs
  async loadAllImmediateOrgIDsForUser() {
    const entities = await OrgMembersEntity.findAll({
      where: {
        userID: this.viewer.userID
      },
      raw: true
    });
    return entities.map((e) => e.orgID);
  }
  // I.e. all orgs they are literally a member of, but not Slack connected orgs
  async loadAllImmediateOrgsForUser() {
    const orgIds = await this.loadAllImmediateOrgIDsForUser();
    return await OrgEntity.findAll({
      where: {
        id: orgIds
      }
    });
  }
  async loadAllOrgIDsForUser() {
    const platformOrgIDs = await this.loadAllImmediateOrgIDsForUser();
    const slackOrgs = await LinkedOrgsEntity.findAll({
      where: {
        sourceOrgID: platformOrgIDs
      }
    });
    const slackOrgsIDs = slackOrgs.map((e) => e.linkedOrgID);
    return [...platformOrgIDs, ...slackOrgsIDs];
  }
  // Use this function if you want to load orgMembership for a user that might
  // not exist in a specified platform org but might exist in the Slack org linked
  // to that specified platform org.
  async loadForSpecifiedPlatformOrgOrLinkedSlackOrg(context, userID, orgID) {
    const orgMembership = await this.loadUserOrgMembership(userID, orgID);
    if (orgMembership) {
      return orgMembership;
    }
    const linkedOrgID = await context.loaders.linkedOrgsLoader.getConnectedSlackOrgID(orgID);
    if (!linkedOrgID) {
      return null;
    }
    return await this.loadUserOrgMembership(userID, linkedOrgID);
  }
  async loadNotifiableOrgMembers(limit) {
    const orgID = assertViewerHasOrg(this.viewer);
    return await OrgMembersEntity.findAll({
      where: {
        orgID
      },
      include: [
        {
          model: UserEntity,
          required: true,
          where: { userType: "person" },
          // dont bother fetching UserEntity attributes
          attributes: []
        }
      ],
      limit
    });
  }
};

// server/src/entity/thread/ThreadEntity.ts
var ThreadEntity = class extends Model24 {
  async belongsToViewerOrgs(viewer) {
    const { orgID } = assertViewerHasIdentity(viewer);
    if (this.orgID === orgID) {
      return true;
    }
    const orgMembersLoader = new OrgMembersLoader(viewer);
    return await orgMembersLoader.viewerCanAccessOrg(this.orgID);
  }
};
__decorateClass([
  Column24({
    type: DataTypes25.UUID,
    allowNull: false,
    primaryKey: true
  })
], ThreadEntity.prototype, "id", 2);
__decorateClass([
  Column24({
    type: DataTypes25.UUID,
    allowNull: false
  })
], ThreadEntity.prototype, "orgID", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TEXT
  })
], ThreadEntity.prototype, "name", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TIME
  })
], ThreadEntity.prototype, "resolvedTimestamp", 2);
__decorateClass([
  Column24({
    type: DataTypes25.UUID
  })
], ThreadEntity.prototype, "resolverUserID", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TEXT,
    allowNull: false
  })
], ThreadEntity.prototype, "url", 2);
__decorateClass([
  Column24({
    type: DataTypes25.ENUM("open", "closed"),
    defaultValue: null
  })
], ThreadEntity.prototype, "supportStatus", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TEXT
  })
], ThreadEntity.prototype, "externalID", 2);
__decorateClass([
  Column24({
    type: DataTypes25.UUID,
    allowNull: false
  })
], ThreadEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column24({
    type: DataTypes25.UUID,
    allowNull: false
  })
], ThreadEntity.prototype, "pageContextHash", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TIME,
    allowNull: false,
    defaultValue: Sequelize3.literal("NOW()")
  })
], ThreadEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column24({
    type: DataTypes25.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], ThreadEntity.prototype, "metadata", 2);
__decorateClass([
  Column24({
    type: DataTypes25.TEXT
  })
], ThreadEntity.prototype, "extraClassnames", 2);
ThreadEntity = __decorateClass([
  Table24({
    tableName: "threads",
    timestamps: false
  })
], ThreadEntity);

// server/src/entity/thread_participant/ThreadParticipantEntity.ts
import { Table as Table25, Column as Column25, Model as Model25 } from "sequelize-typescript";
import { DataTypes as DataTypes26 } from "sequelize";
var ThreadParticipantEntity = class extends Model25 {
};
__decorateClass([
  Column25({
    type: DataTypes26.UUID,
    allowNull: false,
    primaryKey: true
  })
], ThreadParticipantEntity.prototype, "threadID", 2);
__decorateClass([
  Column25({
    type: DataTypes26.UUID,
    allowNull: false,
    primaryKey: true
  })
], ThreadParticipantEntity.prototype, "userID", 2);
__decorateClass([
  Column25({
    type: DataTypes26.UUID,
    allowNull: false,
    primaryKey: true
  })
], ThreadParticipantEntity.prototype, "orgID", 2);
__decorateClass([
  Column25({
    type: DataTypes26.TIME
  })
], ThreadParticipantEntity.prototype, "lastSeenTimestamp", 2);
__decorateClass([
  Column25({
    type: DataTypes26.TIME
  })
], ThreadParticipantEntity.prototype, "lastUnseenMessageTimestamp", 2);
__decorateClass([
  Column25({
    type: DataTypes26.TIME
  })
], ThreadParticipantEntity.prototype, "lastUnseenReactionTimestamp", 2);
__decorateClass([
  Column25({
    type: DataTypes26.BOOLEAN,
    allowNull: false
  })
], ThreadParticipantEntity.prototype, "subscribed", 2);
ThreadParticipantEntity = __decorateClass([
  Table25({
    tableName: "thread_participants",
    timestamps: false
  })
], ThreadParticipantEntity);

// server/src/entity/page_visitor/PageVisitorEntity.ts
import { Table as Table26, Column as Column26, Model as Model26 } from "sequelize-typescript";
import { DataTypes as DataTypes27 } from "sequelize";
var PageVisitorEntity = class extends Model26 {
};
__decorateClass([
  Column26({
    type: DataTypes27.UUID,
    allowNull: false,
    primaryKey: true
  })
], PageVisitorEntity.prototype, "pageContextHash", 2);
__decorateClass([
  Column26({
    type: DataTypes27.UUID,
    allowNull: false,
    primaryKey: true
  })
], PageVisitorEntity.prototype, "userID", 2);
__decorateClass([
  Column26({
    type: DataTypes27.UUID,
    allowNull: false,
    primaryKey: true
  })
], PageVisitorEntity.prototype, "orgID", 2);
__decorateClass([
  Column26({
    type: DataTypes27.TIME
  })
], PageVisitorEntity.prototype, "lastPresentTimestamp", 2);
PageVisitorEntity = __decorateClass([
  Table26({
    tableName: "page_visitors",
    timestamps: false
  })
], PageVisitorEntity);

// server/src/entity/session/SessionEntity.ts
import { Table as Table27, Column as Column27, Model as Model27 } from "sequelize-typescript";
import { DataTypes as DataTypes28, Sequelize as Sequelize4 } from "sequelize";
var SessionEntity = class extends Model27 {
};
__decorateClass([
  Column27({
    type: DataTypes28.UUID,
    defaultValue: DataTypes28.UUIDV4,
    allowNull: false,
    primaryKey: true
  })
], SessionEntity.prototype, "id", 2);
__decorateClass([
  Column27({
    type: DataTypes28.UUID,
    allowNull: false
  })
], SessionEntity.prototype, "applicationID", 2);
__decorateClass([
  Column27({
    type: DataTypes28.TIME,
    allowNull: false,
    defaultValue: Sequelize4.literal("NOW()")
  })
], SessionEntity.prototype, "issuedAt", 2);
__decorateClass([
  Column27({
    type: DataTypes28.TIME
  })
], SessionEntity.prototype, "expiresAt", 2);
SessionEntity = __decorateClass([
  Table27({
    tableName: "sessions",
    timestamps: false
  })
], SessionEntity);

// server/src/logging/performance.ts
import { AsyncLocalStorage } from "async_hooks";
import * as Sentry2 from "@sentry/node";
import { v4 as uuid2 } from "uuid";
var asyncLocalStorage = new AsyncLocalStorage();
var graphQlMetric = TimeHistogram({
  name: `GraphQlExecTime`,
  help: `Execution time of GraphQL operations in seconds`,
  labelNames: ["operation"]
});
var graphQLCounter = Counter2({
  name: "GraphQlExecCount",
  help: "Total number of GraphQL operations executed",
  labelNames: ["operation", "appID"]
});
var openWebsocketMetric = Gauge2({
  name: "OpenWebsockets",
  help: "Number of open websocket connections",
  labelNames: ["appID", "clientVersion", "endpoint", "deployment"]
});

// server/src/entity/heimdall/HeimdallEntity.ts
import { Table as Table28, Column as Column28, Model as Model28 } from "sequelize-typescript";
import { DataTypes as DataTypes29 } from "sequelize";
var HeimdallEntity = class extends Model28 {
  // boolean is the only value supported for now.
  isOn() {
    return this.value;
  }
};
__decorateClass([
  Column28({
    type: DataTypes29.ENUM("prod", "staging", "test", "dev"),
    allowNull: false,
    primaryKey: true
  })
], HeimdallEntity.prototype, "tier", 2);
__decorateClass([
  Column28({
    type: DataTypes29.TEXT,
    allowNull: false,
    primaryKey: true
  })
], HeimdallEntity.prototype, "key", 2);
__decorateClass([
  Column28({
    type: DataTypes29.BOOLEAN,
    allowNull: false
  })
], HeimdallEntity.prototype, "value", 2);
HeimdallEntity = __decorateClass([
  Table28({
    tableName: "heimdall",
    timestamps: false
  })
], HeimdallEntity);

// server/src/entity/email_subscription/EmailSubscriptionEntity.ts
import { Table as Table29, Column as Column29, Model as Model29 } from "sequelize-typescript";
import { DataTypes as DataTypes30 } from "sequelize";
var EmailSubscriptionEntity = class extends Model29 {
};
__decorateClass([
  Column29({
    type: DataTypes30.UUID,
    allowNull: false,
    primaryKey: true
  })
], EmailSubscriptionEntity.prototype, "userID", 2);
__decorateClass([
  Column29({
    type: DataTypes30.UUID,
    allowNull: false,
    primaryKey: true
  })
], EmailSubscriptionEntity.prototype, "threadID", 2);
__decorateClass([
  Column29({
    type: DataTypes30.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
], EmailSubscriptionEntity.prototype, "subscribed", 2);
EmailSubscriptionEntity = __decorateClass([
  Table29({
    tableName: "email_subscription",
    timestamps: false
  })
], EmailSubscriptionEntity);

// server/src/entity/linked_users/LinkedUsersEntity.ts
import { Table as Table30, Column as Column30, Model as Model30 } from "sequelize-typescript";
import { DataTypes as DataTypes31 } from "sequelize";
var LinkedUsersEntity = class extends Model30 {
};
__decorateClass([
  Column30({
    type: DataTypes31.UUID,
    primaryKey: true,
    allowNull: false
  })
], LinkedUsersEntity.prototype, "sourceUserID", 2);
__decorateClass([
  Column30({
    type: DataTypes31.UUID,
    primaryKey: true,
    allowNull: false
  })
], LinkedUsersEntity.prototype, "sourceOrgID", 2);
__decorateClass([
  Column30({
    type: DataTypes31.UUID,
    primaryKey: true,
    allowNull: false
  })
], LinkedUsersEntity.prototype, "linkedUserID", 2);
__decorateClass([
  Column30({
    type: DataTypes31.UUID,
    primaryKey: true,
    allowNull: false
  })
], LinkedUsersEntity.prototype, "linkedOrgID", 2);
__decorateClass([
  Column30({
    type: DataTypes31.TIME
  })
], LinkedUsersEntity.prototype, "linkedTimestamp", 2);
LinkedUsersEntity = __decorateClass([
  Table30({
    tableName: "linked_users",
    timestamps: false
  })
], LinkedUsersEntity);

// server/src/entity/slack_mirrored_thread/SlackMirroredThreadEntity.ts
import { Table as Table31, Column as Column31, Model as Model31 } from "sequelize-typescript";
import { DataTypes as DataTypes32 } from "sequelize";
var SlackMirroredThreadEntity = class extends Model31 {
};
__decorateClass([
  Column31({
    type: DataTypes32.UUID,
    primaryKey: true
  })
], SlackMirroredThreadEntity.prototype, "threadID", 2);
__decorateClass([
  Column31({
    type: DataTypes32.UUID
  })
], SlackMirroredThreadEntity.prototype, "threadOrgID", 2);
__decorateClass([
  Column31({
    type: DataTypes32.UUID
  })
], SlackMirroredThreadEntity.prototype, "slackOrgID", 2);
__decorateClass([
  Column31({
    type: DataTypes32.TEXT
  })
], SlackMirroredThreadEntity.prototype, "slackChannelID", 2);
__decorateClass([
  Column31({
    type: DataTypes32.TEXT
  })
], SlackMirroredThreadEntity.prototype, "slackMessageTimestamp", 2);
__decorateClass([
  Column31({
    type: DataTypes32.TIME
  })
], SlackMirroredThreadEntity.prototype, "timestamp", 2);
SlackMirroredThreadEntity = __decorateClass([
  Table31({
    tableName: "slack_mirrored_threads",
    timestamps: false
  })
], SlackMirroredThreadEntity);

// server/src/entity/message_notification/MessageOutboundNotificationEntity.ts
import { Table as Table32, Column as Column32, Model as Model32, DataType } from "sequelize-typescript";
import { DataTypes as DataTypes33, Sequelize as Sequelize5 } from "sequelize";
var MessageOutboundNotificationEntity = class extends Model32 {
};
__decorateClass([
  Column32({
    type: DataTypes33.TEXT,
    primaryKey: true
  })
], MessageOutboundNotificationEntity.prototype, "id", 2);
__decorateClass([
  Column32({
    type: DataTypes33.UUID
  })
], MessageOutboundNotificationEntity.prototype, "messageID", 2);
__decorateClass([
  Column32({
    type: DataTypes33.ENUM(
      "slack",
      "email",
      "slackEmailMatched",
      "sharedToSlackChannel",
      "sharedToEmail"
    )
  })
], MessageOutboundNotificationEntity.prototype, "type", 2);
__decorateClass([
  Column32({
    type: DataTypes33.TEXT
  })
], MessageOutboundNotificationEntity.prototype, "url", 2);
__decorateClass([
  Column32({
    type: DataTypes33.UUID
  })
], MessageOutboundNotificationEntity.prototype, "targetUserID", 2);
__decorateClass([
  Column32({
    type: DataTypes33.UUID
  })
], MessageOutboundNotificationEntity.prototype, "targetOrgID", 2);
__decorateClass([
  Column32({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: Sequelize5.literal("NOW()")
  })
], MessageOutboundNotificationEntity.prototype, "timestamp", 2);
__decorateClass([
  Column32({
    type: DataTypes33.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], MessageOutboundNotificationEntity.prototype, "metadata", 2);
__decorateClass([
  Column32({
    type: DataTypes33.UUID,
    allowNull: true
  })
], MessageOutboundNotificationEntity.prototype, "sharerUserID", 2);
__decorateClass([
  Column32({
    type: DataTypes33.UUID,
    allowNull: true
  })
], MessageOutboundNotificationEntity.prototype, "sharerOrgID", 2);
__decorateClass([
  Column32({
    type: DataTypes33.JSONB
  })
], MessageOutboundNotificationEntity.prototype, "location", 2);
MessageOutboundNotificationEntity = __decorateClass([
  Table32({
    tableName: "message_notifications",
    timestamps: false
  })
], MessageOutboundNotificationEntity);

// server/src/entity/user/ConsoleUserEntity.ts
import { Table as Table33, Column as Column33, PrimaryKey as PrimaryKey10, Model as Model33 } from "sequelize-typescript";
import { DataTypes as DataTypes34 } from "sequelize";
var ConsoleUserEntity = class extends Model33 {
  get idForLogging() {
    const authSource = this.auth0UserID?.includes("|") ? this.auth0UserID.substring(0, this.auth0UserID.indexOf("|")) : "unknown";
    return `${this.email} [${authSource}]`;
  }
};
__decorateClass([
  PrimaryKey10,
  Column33({
    type: DataTypes34.UUID,
    defaultValue: DataTypes34.UUIDV4
  })
], ConsoleUserEntity.prototype, "id", 2);
__decorateClass([
  Column33({ type: DataTypes34.STRING, unique: true })
], ConsoleUserEntity.prototype, "email", 2);
__decorateClass([
  Column33({
    type: DataTypes34.STRING,
    allowNull: true
  })
], ConsoleUserEntity.prototype, "name", 2);
__decorateClass([
  Column33({ type: DataTypes34.STRING, allowNull: true })
], ConsoleUserEntity.prototype, "picture", 2);
__decorateClass([
  Column33({
    type: DataTypes34.UUID,
    defaultValue: null
  })
], ConsoleUserEntity.prototype, "customerID", 2);
__decorateClass([
  Column33({
    type: DataTypes34.BOOLEAN,
    defaultValue: false
  })
], ConsoleUserEntity.prototype, "verified", 2);
__decorateClass([
  Column33({
    type: DataTypes34.STRING,
    allowNull: true
  })
], ConsoleUserEntity.prototype, "auth0UserID", 2);
__decorateClass([
  Column33({
    type: DataTypes34.UUID,
    defaultValue: null
  })
], ConsoleUserEntity.prototype, "pendingCustomerID", 2);
__decorateClass([
  Column33({
    type: DataTypes34.UUID,
    defaultValue: null
  })
], ConsoleUserEntity.prototype, "loopsUserID", 2);
ConsoleUserEntity = __decorateClass([
  Table33({
    tableName: "console_users",
    timestamps: false
  })
], ConsoleUserEntity);

// server/src/entity/user_hidden_annotations/UserHiddenAnnotationsEntity.ts
import { Table as Table34, Column as Column34, Model as Model34 } from "sequelize-typescript";
import { DataTypes as DataTypes35 } from "sequelize";
var UserHiddenAnnotationsEntity = class extends Model34 {
};
__decorateClass([
  Column34({
    type: DataTypes35.UUID,
    primaryKey: true
  })
], UserHiddenAnnotationsEntity.prototype, "userID", 2);
__decorateClass([
  Column34({
    type: DataTypes35.UUID,
    primaryKey: true
  })
], UserHiddenAnnotationsEntity.prototype, "annotationID", 2);
__decorateClass([
  Column34({
    type: DataTypes35.UUID
  })
], UserHiddenAnnotationsEntity.prototype, "pageContextHash", 2);
__decorateClass([
  Column34({
    type: DataTypes35.UUID
  })
], UserHiddenAnnotationsEntity.prototype, "orgID", 2);
UserHiddenAnnotationsEntity = __decorateClass([
  Table34({
    tableName: "user_hidden_annotations",
    timestamps: false
  })
], UserHiddenAnnotationsEntity);

// server/src/entity/extrernal_asset/ExternalAssetEntity.ts
import { Table as Table35, Column as Column35, Model as Model35 } from "sequelize-typescript";
import { DataTypes as DataTypes36 } from "sequelize";
var ExternalAssetEntity = class extends Model35 {
};
__decorateClass([
  Column35({
    type: DataTypes36.TEXT,
    primaryKey: true,
    allowNull: false
  })
], ExternalAssetEntity.prototype, "url", 2);
__decorateClass([
  Column35({
    type: DataTypes36.TIME,
    allowNull: false
  })
], ExternalAssetEntity.prototype, "downloadTimestamp", 2);
__decorateClass([
  Column35({
    type: DataTypes36.TEXT,
    allowNull: false
  })
], ExternalAssetEntity.prototype, "sha384", 2);
ExternalAssetEntity = __decorateClass([
  Table35({
    tableName: "external_assets",
    timestamps: false
  })
], ExternalAssetEntity);

// server/src/entity/image_variant/ImageVariantEntity.ts
import { Table as Table36, Column as Column36, Model as Model36 } from "sequelize-typescript";
import { DataTypes as DataTypes37 } from "sequelize";
var ImageVariantEntity = class extends Model36 {
};
__decorateClass([
  Column36({
    type: DataTypes37.TEXT,
    primaryKey: true,
    allowNull: false
  })
], ImageVariantEntity.prototype, "sourceSha384", 2);
__decorateClass([
  Column36({
    type: DataTypes37.TEXT,
    primaryKey: true,
    allowNull: false
  })
], ImageVariantEntity.prototype, "variant", 2);
__decorateClass([
  Column36({
    type: DataTypes37.TIME,
    allowNull: false
  })
], ImageVariantEntity.prototype, "timestamp", 2);
__decorateClass([
  Column36({
    type: DataTypes37.TEXT,
    allowNull: false
  })
], ImageVariantEntity.prototype, "filename", 2);
ImageVariantEntity = __decorateClass([
  Table36({
    tableName: "image_variants",
    timestamps: false
  })
], ImageVariantEntity);

// server/src/entity/slack_mirrored_support_thread/SlackMirroredSupportThreadEntity.ts
import { Column as Column37, Table as Table37, Model as Model37 } from "sequelize-typescript";
import { DataTypes as DataTypes38, Sequelize as Sequelize6 } from "sequelize";
var SlackMirroredSupportThreadEntity = class extends Model37 {
};
__decorateClass([
  Column37({
    type: DataTypes38.UUID,
    primaryKey: true,
    allowNull: false
  })
], SlackMirroredSupportThreadEntity.prototype, "threadID", 2);
__decorateClass([
  Column37({
    type: DataTypes38.UUID,
    allowNull: false
  })
], SlackMirroredSupportThreadEntity.prototype, "threadOrgID", 2);
__decorateClass([
  Column37({
    type: DataTypes38.UUID,
    allowNull: false
  })
], SlackMirroredSupportThreadEntity.prototype, "slackOrgID", 2);
__decorateClass([
  Column37({
    type: DataTypes38.TEXT,
    allowNull: false
  })
], SlackMirroredSupportThreadEntity.prototype, "slackChannelID", 2);
__decorateClass([
  Column37({
    type: DataTypes38.TEXT,
    allowNull: false
  })
], SlackMirroredSupportThreadEntity.prototype, "slackMessageTimestamp", 2);
__decorateClass([
  Column37({
    type: DataTypes38.TIME,
    defaultValue: Sequelize6.literal("CURRENT_TIMESTAMP")
  })
], SlackMirroredSupportThreadEntity.prototype, "timestamp", 2);
SlackMirroredSupportThreadEntity = __decorateClass([
  Table37({
    tableName: "slack_mirrored_support_threads",
    timestamps: false
  })
], SlackMirroredSupportThreadEntity);

// server/src/entity/deploys/DeploysEntity.ts
import { Table as Table38, Column as Column38, PrimaryKey as PrimaryKey11, Model as Model38 } from "sequelize-typescript";
import { DataTypes as DataTypes39 } from "sequelize";
var DeploysEntity = class extends Model38 {
};
__decorateClass([
  PrimaryKey11,
  Column38({
    type: DataTypes39.UUID,
    defaultValue: DataTypes39.UUIDV4
  })
], DeploysEntity.prototype, "id", 2);
__decorateClass([
  Column38({
    type: DataTypes39.ENUM("prod", "staging", "test", "dev")
  })
], DeploysEntity.prototype, "tier", 2);
__decorateClass([
  Column38({
    type: DataTypes39.DATE
  })
], DeploysEntity.prototype, "deployStartTime", 2);
__decorateClass([
  Column38({
    type: DataTypes39.TIME
  })
], DeploysEntity.prototype, "deployFinishTime", 2);
__decorateClass([
  Column38({
    type: DataTypes39.BOOLEAN
  })
], DeploysEntity.prototype, "success", 2);
__decorateClass([
  Column38({
    type: DataTypes39.TEXT
  })
], DeploysEntity.prototype, "error", 2);
__decorateClass([
  Column38({
    type: DataTypes39.TEXT
  })
], DeploysEntity.prototype, "gitCommitHash", 2);
__decorateClass([
  Column38({
    type: DataTypes39.TEXT
  })
], DeploysEntity.prototype, "dockerImage", 2);
__decorateClass([
  Column38({
    type: DataTypes39.TEXT
  })
], DeploysEntity.prototype, "packageVersion", 2);
DeploysEntity = __decorateClass([
  Table38({
    tableName: "deploys",
    timestamps: false
  })
], DeploysEntity);

// server/src/entity/task_third_party_subscription/TaskThirdPartySubscriptionEntity.ts
import { Table as Table39, Column as Column39, Model as Model39 } from "sequelize-typescript";
import { DataTypes as DataTypes40 } from "sequelize";
var TaskThirdPartySubscriptionEntity = class extends Model39 {
};
__decorateClass([
  Column39({ type: DataTypes40.UUID, primaryKey: true })
], TaskThirdPartySubscriptionEntity.prototype, "id", 2);
__decorateClass([
  Column39({ type: DataTypes40.UUID })
], TaskThirdPartySubscriptionEntity.prototype, "userID", 2);
__decorateClass([
  Column39({ type: DataTypes40.UUID })
], TaskThirdPartySubscriptionEntity.prototype, "orgID", 2);
__decorateClass([
  Column39({ type: ThirdPartyConnectionDataType })
], TaskThirdPartySubscriptionEntity.prototype, "externalConnectionType", 2);
__decorateClass([
  Column39({ type: DataTypes40.JSONB })
], TaskThirdPartySubscriptionEntity.prototype, "subscriptionDetails", 2);
__decorateClass([
  Column39({ type: DataTypes40.TIME })
], TaskThirdPartySubscriptionEntity.prototype, "createdTimestamp", 2);
TaskThirdPartySubscriptionEntity = __decorateClass([
  Table39({
    tableName: "task_third_party_subscriptions",
    timestamps: false
  })
], TaskThirdPartySubscriptionEntity);

// server/src/entity/application_usage_metric/ApplicationUsageMetricEntity.ts
import { Table as Table40, Column as Column40, Model as Model40 } from "sequelize-typescript";
import { DataTypes as DataTypes41 } from "sequelize";
var ApplicationUsageMetricEntity = class extends Model40 {
};
__decorateClass([
  Column40({
    type: DataTypes41.UUID,
    primaryKey: true
  })
], ApplicationUsageMetricEntity.prototype, "applicationID", 2);
__decorateClass([
  Column40({
    type: DataTypes41.UUID,
    primaryKey: true
  })
], ApplicationUsageMetricEntity.prototype, "metricID", 2);
__decorateClass([
  Column40({
    type: DataTypes41.DATE,
    primaryKey: true
  })
], ApplicationUsageMetricEntity.prototype, "date", 2);
__decorateClass([
  Column40({
    type: DataTypes41.INTEGER,
    allowNull: false
  })
], ApplicationUsageMetricEntity.prototype, "value", 2);
ApplicationUsageMetricEntity = __decorateClass([
  Table40({
    tableName: "application_usage_metrics",
    timestamps: false
  })
], ApplicationUsageMetricEntity);

// server/src/entity/application_usage_metric/ApplicationUsageMetricTypeEntity.ts
import { Table as Table41, Column as Column41, Model as Model41 } from "sequelize-typescript";
import { DataTypes as DataTypes42 } from "sequelize";
var ApplicationUsageMetricTypeEntity = class extends Model41 {
};
__decorateClass([
  Column41({
    type: DataTypes42.UUID,
    primaryKey: true
  })
], ApplicationUsageMetricTypeEntity.prototype, "id", 2);
__decorateClass([
  Column41({
    type: DataTypes42.TEXT,
    allowNull: false
  })
], ApplicationUsageMetricTypeEntity.prototype, "metric", 2);
ApplicationUsageMetricTypeEntity = __decorateClass([
  Table41({
    tableName: "application_usage_metric_types",
    timestamps: false
  })
], ApplicationUsageMetricTypeEntity);

// server/src/entity/notification/NotificationEntity.ts
import { Table as Table42, Column as Column42, Model as Model42 } from "sequelize-typescript";
import { literal, DataTypes as DataTypes43 } from "sequelize";
var NotificationEntity = class extends Model42 {
};
__decorateClass([
  Column42({
    type: DataTypes43.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes43.UUIDV4
  })
], NotificationEntity.prototype, "id", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID })
], NotificationEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID })
], NotificationEntity.prototype, "externalID", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID, allowNull: false })
], NotificationEntity.prototype, "recipientID", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID, allowNull: true })
], NotificationEntity.prototype, "senderID", 2);
__decorateClass([
  Column42({ type: DataTypes43.TEXT, allowNull: true })
], NotificationEntity.prototype, "iconUrl", 2);
__decorateClass([
  Column42({
    type: DataTypes43.ENUM("reply", "reaction", "external", "thread_action"),
    allowNull: false
  })
], NotificationEntity.prototype, "type", 2);
__decorateClass([
  Column42({ type: DataTypes43.TEXT, allowNull: true })
], NotificationEntity.prototype, "aggregationKey", 2);
__decorateClass([
  Column42({
    type: DataTypes43.ENUM("unread", "read"),
    allowNull: false,
    defaultValue: "unread"
  })
], NotificationEntity.prototype, "readStatus", 2);
__decorateClass([
  Column42({
    type: DataTypes43.TIME,
    allowNull: false,
    defaultValue: literal("CURRENT_TIMESTAMP")
  })
], NotificationEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID, allowNull: true })
], NotificationEntity.prototype, "messageID", 2);
__decorateClass([
  Column42({ type: DataTypes43.ARRAY(DataTypes43.TEXT), allowNull: true })
], NotificationEntity.prototype, "replyActions", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID, allowNull: true })
], NotificationEntity.prototype, "reactionID", 2);
__decorateClass([
  Column42({ type: DataTypes43.UUID, allowNull: true })
], NotificationEntity.prototype, "threadID", 2);
__decorateClass([
  Column42({ type: DataTypes43.ENUM("resolve", "unresolve"), allowNull: true })
], NotificationEntity.prototype, "threadActionType", 2);
__decorateClass([
  Column42({ type: DataTypes43.TEXT, allowNull: true })
], NotificationEntity.prototype, "externalTemplate", 2);
__decorateClass([
  Column42({ type: DataTypes43.TEXT, allowNull: true })
], NotificationEntity.prototype, "externalURL", 2);
__decorateClass([
  Column42({ type: DataTypes43.TEXT, allowNull: true })
], NotificationEntity.prototype, "extraClassnames", 2);
__decorateClass([
  Column42({
    type: DataTypes43.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], NotificationEntity.prototype, "metadata", 2);
NotificationEntity = __decorateClass([
  Table42({
    tableName: "notifications",
    timestamps: false
  })
], NotificationEntity);

// server/src/entity/go_redirect/AdminGoRedirectEntity.ts
import { Table as Table43, Column as Column43, Model as Model43 } from "sequelize-typescript";
import { DataTypes as DataTypes44 } from "sequelize";
var AdminGoRedirectEntity = class extends Model43 {
};
__decorateClass([
  Column43({
    type: DataTypes44.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes44.UUIDV4
  })
], AdminGoRedirectEntity.prototype, "id", 2);
__decorateClass([
  Column43({
    type: DataTypes44.TEXT,
    allowNull: false
  })
], AdminGoRedirectEntity.prototype, "name", 2);
__decorateClass([
  Column43({
    type: DataTypes44.TEXT,
    allowNull: false
  })
], AdminGoRedirectEntity.prototype, "url", 2);
__decorateClass([
  Column43({
    type: DataTypes44.UUID,
    allowNull: false
  })
], AdminGoRedirectEntity.prototype, "creatorUserID", 2);
__decorateClass([
  Column43({
    type: DataTypes44.UUID,
    allowNull: false
  })
], AdminGoRedirectEntity.prototype, "updaterUserID", 2);
__decorateClass([
  Column43({
    type: DataTypes44.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
], AdminGoRedirectEntity.prototype, "redirectCount", 2);
AdminGoRedirectEntity = __decorateClass([
  Table43({
    tableName: "admin_go_redirects",
    timestamps: false
  })
], AdminGoRedirectEntity);

// server/src/entity/admin_crt/AdminCRTCustomerIssueEntity.ts
import { Table as Table44, Column as Column44, PrimaryKey as PrimaryKey12, Model as Model44 } from "sequelize-typescript";
import { DataTypes as DataTypes45 } from "sequelize";
var AdminCRTCustomerIssueEntity = class extends Model44 {
};
__decorateClass([
  PrimaryKey12,
  Column44({
    defaultValue: DataTypes45.UUIDV4,
    type: DataTypes45.UUID
  })
], AdminCRTCustomerIssueEntity.prototype, "id", 2);
__decorateClass([
  Column44({
    type: DataTypes45.UUID
  })
], AdminCRTCustomerIssueEntity.prototype, "customerID", 2);
__decorateClass([
  Column44({
    type: DataTypes45.TEXT
  })
], AdminCRTCustomerIssueEntity.prototype, "title", 2);
__decorateClass([
  Column44({
    type: DataTypes45.TEXT
  })
], AdminCRTCustomerIssueEntity.prototype, "body", 2);
__decorateClass([
  Column44({
    type: DataTypes45.ENUM("them", "us")
  })
], AdminCRTCustomerIssueEntity.prototype, "comingFrom", 2);
__decorateClass([
  Column44({
    type: DataTypes45.ENUM("done", "pending", "accepted", "rejected")
  })
], AdminCRTCustomerIssueEntity.prototype, "decision", 2);
__decorateClass([
  Column44({
    type: DataTypes45.ENUM(
      "none",
      "request_acked",
      "decision_sent",
      "decision_acked"
    )
  })
], AdminCRTCustomerIssueEntity.prototype, "communicationStatus", 2);
__decorateClass([
  Column44({
    type: DataTypes45.TIME,
    allowNull: true
  })
], AdminCRTCustomerIssueEntity.prototype, "lastTouch", 2);
__decorateClass([
  Column44({
    type: DataTypes45.ENUM("request", "bug", "onboarding_step"),
    allowNull: true
  })
], AdminCRTCustomerIssueEntity.prototype, "type", 2);
__decorateClass([
  Column44({
    type: DataTypes45.ENUM("blocker", "high", "low"),
    allowNull: true
  })
], AdminCRTCustomerIssueEntity.prototype, "priority", 2);
__decorateClass([
  Column44({
    type: DataTypes45.UUID,
    allowNull: true
  })
], AdminCRTCustomerIssueEntity.prototype, "assignee", 2);
__decorateClass([
  Column44({
    type: DataTypes45.TIME
  })
], AdminCRTCustomerIssueEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column44({
    type: DataTypes45.BOOLEAN,
    defaultValue: false
  })
], AdminCRTCustomerIssueEntity.prototype, "externallyVisible", 2);
AdminCRTCustomerIssueEntity = __decorateClass([
  Table44({
    tableName: "admin_crt_customer_issues",
    timestamps: false
  })
], AdminCRTCustomerIssueEntity);

// server/src/entity/admin_crt/AdminCRTCustomerIssueChangeEntity.ts
import { Table as Table45, Column as Column45, PrimaryKey as PrimaryKey13, Model as Model45 } from "sequelize-typescript";
import { DataTypes as DataTypes46 } from "sequelize";
var AdminCRTCustomerIssueChangeEntity = class extends Model45 {
};
__decorateClass([
  PrimaryKey13,
  Column45({
    defaultValue: DataTypes46.UUIDV4,
    type: DataTypes46.UUID
  })
], AdminCRTCustomerIssueChangeEntity.prototype, "id", 2);
__decorateClass([
  Column45({
    type: DataTypes46.UUID
  })
], AdminCRTCustomerIssueChangeEntity.prototype, "issueID", 2);
__decorateClass([
  Column45({
    type: DataTypes46.UUID
  })
], AdminCRTCustomerIssueChangeEntity.prototype, "userID", 2);
__decorateClass([
  Column45({
    type: DataTypes46.JSONB
  })
], AdminCRTCustomerIssueChangeEntity.prototype, "changeDetail", 2);
__decorateClass([
  Column45({
    type: DataTypes46.TIME
  })
], AdminCRTCustomerIssueChangeEntity.prototype, "timestamp", 2);
AdminCRTCustomerIssueChangeEntity = __decorateClass([
  Table45({
    tableName: "admin_crt_customer_issue_changes",
    timestamps: false
  })
], AdminCRTCustomerIssueChangeEntity);

// server/src/entity/admin_crt/AdminCRTCustomerIssueSubscriptionEntity.ts
import { Table as Table46, Column as Column46, Model as Model46 } from "sequelize-typescript";
import { DataTypes as DataTypes47 } from "sequelize";
var AdminCRTCustomerIssueSubscriptionEntity = class extends Model46 {
};
__decorateClass([
  Column46({
    type: DataTypes47.UUID,
    primaryKey: true,
    allowNull: false
  })
], AdminCRTCustomerIssueSubscriptionEntity.prototype, "issueID", 2);
__decorateClass([
  Column46({
    type: DataTypes47.UUID,
    primaryKey: true,
    allowNull: false
  })
], AdminCRTCustomerIssueSubscriptionEntity.prototype, "userID", 2);
AdminCRTCustomerIssueSubscriptionEntity = __decorateClass([
  Table46({
    tableName: "admin_crt_customer_issue_subscriptions",
    timestamps: false
  })
], AdminCRTCustomerIssueSubscriptionEntity);

// server/src/entity/message_link_preview/MessageLinkPreviewEntity.ts
import { Table as Table47, Column as Column47, PrimaryKey as PrimaryKey14, Model as Model47 } from "sequelize-typescript";
import { DataTypes as DataTypes48 } from "sequelize";
var MessageLinkPreviewEntity = class extends Model47 {
};
__decorateClass([
  PrimaryKey14,
  Column47({
    type: DataTypes48.UUID,
    defaultValue: DataTypes48.UUIDV4
  })
], MessageLinkPreviewEntity.prototype, "id", 2);
__decorateClass([
  Column47({
    type: DataTypes48.UUID
  })
], MessageLinkPreviewEntity.prototype, "messageID", 2);
__decorateClass([
  Column47({
    type: DataTypes48.TEXT
  })
], MessageLinkPreviewEntity.prototype, "url", 2);
__decorateClass([
  Column47({
    type: DataTypes48.TEXT
  })
], MessageLinkPreviewEntity.prototype, "img", 2);
__decorateClass([
  Column47({
    type: DataTypes48.TEXT
  })
], MessageLinkPreviewEntity.prototype, "title", 2);
__decorateClass([
  Column47({
    type: DataTypes48.TEXT
  })
], MessageLinkPreviewEntity.prototype, "description", 2);
__decorateClass([
  Column47({
    type: DataTypes48.TIME
  })
], MessageLinkPreviewEntity.prototype, "lastScrapedTimestamp", 2);
__decorateClass([
  Column47({
    type: DataTypes48.BOOLEAN
  })
], MessageLinkPreviewEntity.prototype, "hidden", 2);
MessageLinkPreviewEntity = __decorateClass([
  Table47({
    tableName: "message_link_previews",
    timestamps: false
  })
], MessageLinkPreviewEntity);

// server/src/entity/application_webhook/ApplicationWebhookEntity.ts
import { Table as Table48, Column as Column48, Model as Model48 } from "sequelize-typescript";
import { DataTypes as DataTypes49 } from "sequelize";
var ApplicationWebhookEntity = class extends Model48 {
};
__decorateClass([
  Column48({
    type: DataTypes49.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes49.UUIDV4
  })
], ApplicationWebhookEntity.prototype, "id", 2);
__decorateClass([
  Column48({
    type: DataTypes49.UUID,
    allowNull: false,
    unique: "AppURLUniqueness"
  })
], ApplicationWebhookEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column48({
    type: DataTypes49.STRING,
    allowNull: false,
    unique: "AppURLUniqueness"
  })
], ApplicationWebhookEntity.prototype, "eventWebhookURL", 2);
__decorateClass([
  Column48({
    type: DataTypes49.ARRAY(DataTypes49.TEXT),
    defaultValue: null
  })
], ApplicationWebhookEntity.prototype, "eventWebhookSubscriptions", 2);
ApplicationWebhookEntity = __decorateClass([
  Table48({
    tableName: "application_webhooks",
    timestamps: false
  })
], ApplicationWebhookEntity);

// server/src/entity/demo/WarmDemoUserEntity.ts
import { Table as Table49, Column as Column49, PrimaryKey as PrimaryKey15, Model as Model49 } from "sequelize-typescript";
import { DataTypes as DataTypes50 } from "sequelize";
var WarmDemoUserEntity = class extends Model49 {
};
__decorateClass([
  PrimaryKey15,
  Column49({
    defaultValue: DataTypes50.UUIDV4,
    type: DataTypes50.UUID
  })
], WarmDemoUserEntity.prototype, "id", 2);
__decorateClass([
  Column49({
    type: DataTypes50.TEXT,
    allowNull: false
  })
], WarmDemoUserEntity.prototype, "demoGroup", 2);
__decorateClass([
  Column49({
    type: DataTypes50.INTEGER,
    allowNull: false
  })
], WarmDemoUserEntity.prototype, "version", 2);
__decorateClass([
  Column49({
    type: DataTypes50.UUID,
    allowNull: false
  })
], WarmDemoUserEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column49({
    type: DataTypes50.TEXT,
    allowNull: false
  })
], WarmDemoUserEntity.prototype, "userID", 2);
__decorateClass([
  Column49({
    type: DataTypes50.TEXT,
    allowNull: false
  })
], WarmDemoUserEntity.prototype, "orgID", 2);
WarmDemoUserEntity = __decorateClass([
  Table49({
    tableName: "warm_demo_users",
    timestamps: false
  })
], WarmDemoUserEntity);

// server/src/entity/preallocated_thread_id/PreallocatedThreadIDEntity.ts
import { Table as Table50, Column as Column50, Model as Model50 } from "sequelize-typescript";
import { DataTypes as DataTypes51 } from "sequelize";
var PreallocatedThreadIDEntity = class extends Model50 {
};
__decorateClass([
  Column50({
    type: DataTypes51.UUID,
    allowNull: false,
    primaryKey: true
  })
], PreallocatedThreadIDEntity.prototype, "id", 2);
__decorateClass([
  Column50({
    type: DataTypes51.TEXT,
    allowNull: false
  })
], PreallocatedThreadIDEntity.prototype, "externalID", 2);
__decorateClass([
  Column50({
    type: DataTypes51.UUID,
    allowNull: false
  })
], PreallocatedThreadIDEntity.prototype, "platformApplicationID", 2);
PreallocatedThreadIDEntity = __decorateClass([
  Table50({
    tableName: "preallocated_thread_ids",
    timestamps: false
  })
], PreallocatedThreadIDEntity);

// server/src/entity/permission/PermisssionRuleEntity.ts
import { DataTypes as DataTypes52 } from "sequelize";
import { Column as Column51, Model as Model51, PrimaryKey as PrimaryKey16, Table as Table51 } from "sequelize-typescript";
var PermissionValues = [
  "thread:read",
  "thread:send-message",
  "thread-participant:read",
  "message:read"
];
var PermissionRuleEntity = class extends Model51 {
};
__decorateClass([
  PrimaryKey16,
  Column51({
    type: DataTypes52.UUID,
    defaultValue: DataTypes52.UUIDV4
  })
], PermissionRuleEntity.prototype, "id", 2);
__decorateClass([
  Column51({ type: DataTypes52.UUID, allowNull: false })
], PermissionRuleEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column51({ type: DataTypes52.STRING, allowNull: false })
], PermissionRuleEntity.prototype, "resourceSelector", 2);
__decorateClass([
  Column51({ type: DataTypes52.STRING, allowNull: false })
], PermissionRuleEntity.prototype, "userSelector", 2);
__decorateClass([
  Column51({
    type: DataTypes52.ARRAY(DataTypes52.ENUM(...PermissionValues)),
    allowNull: false
  })
], PermissionRuleEntity.prototype, "permissions", 2);
PermissionRuleEntity = __decorateClass([
  Table51({
    tableName: "permission_rules",
    timestamps: false
  })
], PermissionRuleEntity);

// server/src/entity/org_org_members/OrgOrgMembersEntity.ts
import { Table as Table52, Column as Column52, Model as Model52 } from "sequelize-typescript";
import { DataTypes as DataTypes53 } from "sequelize";
var OrgOrgMembersEntity = class extends Model52 {
};
__decorateClass([
  Column52({
    type: DataTypes53.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgOrgMembersEntity.prototype, "childOrgID", 2);
__decorateClass([
  Column52({
    type: DataTypes53.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgOrgMembersEntity.prototype, "parentOrgID", 2);
__decorateClass([
  Column52({
    type: DataTypes53.UUID,
    allowNull: false
  })
], OrgOrgMembersEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column52({
    type: DataTypes53.TIME
  })
], OrgOrgMembersEntity.prototype, "createdTimestamp", 2);
OrgOrgMembersEntity = __decorateClass([
  Table52({
    tableName: "org_org_members",
    timestamps: false
  })
], OrgOrgMembersEntity);

// server/src/entity/sequelize.ts
var {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} = Env_default;
var MAX_QUERY_LOG_LENGTH = 1e4;
var queryExecutionTimeMetric = TimeHistogram({
  name: "SequelizeQueryTime",
  help: "Execution time of Sequelize queries",
  labelNames: ["type", "appID"]
});
var openDbConnectionsMetric = Gauge2({
  name: "OpenDatabaseConnections",
  help: "Number of open database connections"
});
var acquireTimeMetric = TimeHistogram({
  name: "SequelizePoolAcquireTime",
  help: "Time spent waiting to acquire a Sequelize connection",
  // Like our default buckets, but extend the lower bound down to 10us because
  // connection acquire should be very fast.
  buckets: logBuckets(1e-5, 10, 19)
});
var _availableConnectionsMetric = Gauge2({
  name: "SequelizePoolAvailable",
  help: "Number of available connections in the Sequelize connection pool",
  collect() {
    if (sequelize) {
      this.set(sequelize.connectionManager.pool.available);
    }
  }
});
var _usingConnectionsMetric = Gauge2({
  name: "SequelizePoolUsed",
  help: "Number of in-use connections in the Sequelize connection pool",
  collect() {
    if (sequelize) {
      this.set(sequelize.connectionManager.pool.using);
    }
  }
});
var _waitingConnectionsMetric = Gauge2({
  name: "SequelizePoolWaiting",
  help: "Number of requests waiting for a Sequelize connection",
  collect() {
    if (sequelize) {
      this.set(sequelize.connectionManager.pool.waiting);
    }
  }
});
var acquireStarts = /* @__PURE__ */ new WeakMap();
var apiSequelizeOptions = {
  dialect: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  schema: "cord",
  models: [
    EventEntity,
    MessageEntity,
    MessageAttachmentEntity,
    MessageLinkPreviewEntity,
    ThreadParticipantEntity,
    PageVisitorEntity,
    OrgEntity,
    UserEntity,
    FileEntity,
    PageEntity,
    ThreadEntity,
    PreallocatedThreadIDEntity,
    MessageReactionEntity,
    MessageMentionEntity,
    SlackChannelEntity,
    SlackMessageEntity,
    UserPreferenceEntity,
    DeploysEntity,
    TaskEntity,
    TaskTodoEntity,
    TaskAssigneeEntity,
    ThirdPartyConnectionEntity,
    TaskThirdPartyReference,
    TaskThirdPartySubscriptionEntity,
    ApplicationEntity,
    CustomerEntity,
    SessionEntity,
    OrgMembersEntity,
    S3BucketEntity,
    HeimdallEntity,
    EmailSubscriptionEntity,
    LinkedOrgsEntity,
    LinkedUsersEntity,
    SlackMirroredThreadEntity,
    MessageOutboundNotificationEntity,
    ConsoleUserEntity,
    UserHiddenAnnotationsEntity,
    ExternalAssetEntity,
    ImageVariantEntity,
    EmailOutboundNotificationEntity,
    SlackMirroredSupportThreadEntity,
    ApplicationUsageMetricEntity,
    ApplicationUsageMetricTypeEntity,
    NotificationEntity,
    AdminGoRedirectEntity,
    AdminCRTCustomerIssueEntity,
    AdminCRTCustomerIssueChangeEntity,
    AdminCRTCustomerIssueSubscriptionEntity,
    ApplicationWebhookEntity,
    WarmDemoUserEntity,
    PermissionRuleEntity,
    OrgOrgMembersEntity
  ],
  benchmark: true,
  logging: (...args) => {
    const [msg, timing_ms, sequelizeInfo] = args;
    const truncatedMsg = msg.length <= MAX_QUERY_LOG_LENGTH ? msg : msg.substring(0, MAX_QUERY_LOG_LENGTH) + ` (truncated from ${msg.length} bytes)`;
    const { type, bind, tableNames } = sequelizeInfo;
    const storage = asyncLocalStorage?.getStore();
    const logger = storage?.logger ?? anonymousLogger();
    logger.debug(`Sequelize: ${truncatedMsg}`, {
      sequelize: { type, bind, tableNames },
      timing_ms,
      operationName: storage?.operationName,
      operationID: storage?.operationID,
      platformApplicationID: storage?.platformApplicationID
    });
    queryExecutionTimeMetric.observe(
      { type, appID: storage?.platformApplicationID },
      timing_ms / 1e3
    );
  },
  pool: {
    // Maximum number of connection in pool
    max: 50,
    // Minimum number of connection in pool
    min: 50,
    // The number of times a connection can be used before discarding it for a
    // replacement
    maxUses: 500,
    // Time out if the pool doesn't manage to establish a new connection within
    // 10 seconds
    acquire: 1e4
  },
  hooks: {
    // on any new database connection we set the search path, so when
    // database objects (tables, types, functions etc.) are given without
    // explicitly specifying the schema they are in, they are found if
    // they are in either cord or public.
    // This is also done in `.sequelize-config.js` so that it applies in
    // migrations, where statements such as `CREATE TABLE` will create
    // objects in the first schema of the search_path (`cord`).
    afterConnect: async (connection) => {
      await connection.query("SET search_path=cord,public;");
      openDbConnectionsMetric.inc(1);
    },
    afterDisconnect: (_connection) => {
      openDbConnectionsMetric.dec(1);
    },
    beforePoolAcquire: (options) => {
      acquireStarts.set(options, performance.now());
    },
    afterPoolAcquire: (_connection, options) => {
      const start = acquireStarts.get(options);
      if (start) {
        const elapsed = performance.now() - start;
        acquireStarts.delete(options);
        acquireTimeMetric.observe(elapsed / 1e3);
      }
    }
  },
  dialectOptions: {
    // any SQL statement should timeout after 10s (10s is very conservative, we
    // might want to reduce it further eventually).
    statement_timeout: 1e4,
    // a transaction that does not send a statement for 5s should timeout
    idle_in_transaction_session_timeout: 5e3
  }
};
function initializeEntityRelationships() {
  MessageEntity.hasMany(MessageMentionEntity, {
    as: "mentions",
    foreignKey: "messageID"
  });
  MessageEntity.hasMany(TaskEntity, {
    as: "tasks",
    foreignKey: "messageID"
  });
  TaskEntity.hasMany(TaskAssigneeEntity, {
    as: "assignees",
    foreignKey: "taskID"
  });
  TaskEntity.hasOne(MessageEntity, {
    sourceKey: "messageID",
    foreignKey: "id",
    as: "message"
  });
  TaskThirdPartyReference.hasOne(TaskEntity, {
    as: "task",
    sourceKey: "taskID",
    foreignKey: "id"
  });
  OrgEntity.hasOne(LinkedOrgsEntity, {
    sourceKey: "id",
    foreignKey: "linkedOrgID"
  });
  OrgMembersEntity.hasOne(UserEntity, {
    sourceKey: "userID",
    foreignKey: "id"
  });
  MessageEntity.hasOne(ThreadEntity, {
    as: "thread",
    sourceKey: "threadID",
    foreignKey: "id"
  });
}
var sequelize;
function getSequelizeOptions(workerType) {
  switch (workerType) {
    case "api":
    case "test":
    case "master":
    case "script":
      return apiSequelizeOptions;
    case "async":
      return {
        ...apiSequelizeOptions,
        dialectOptions: {
          // Set the statement timeout to 2 minutes (in milliseconds), to allow
          // longer-running SQL statements in async jobs
          ...apiSequelizeOptions.dialectOptions,
          statement_timeout: 2 * 60 * 1e3
        }
      };
    case "admin":
    case "console":
      return {
        ...apiSequelizeOptions,
        pool: {
          ...apiSequelizeOptions.pool,
          max: 20,
          min: 0
        }
      };
    default: {
      const _exhaustiveSwitchGuard = workerType;
      throw new Error("Invalid worker type " + workerType);
    }
  }
}
async function initSequelize(workerType) {
  if (sequelize !== void 0) {
    throw new Error("Sequelize has been already initialised");
  }
  const opts = getSequelizeOptions(workerType);
  const seq = new Sequelize7(opts);
  initializeEntityRelationships();
  await seq.authenticate();
  sequelize = seq;
}

// scripts/generate-customer-auth-token.ts
async function main() {
  const argv = yargs(process.argv.slice(2)).option({
    customerID: {
      description: "customer ID to generate the auth token for",
      type: "string",
      default: CORD_CUSTOMER_ID
    }
  }).argv;
  await initSequelize("script");
  const customer = await CustomerEntity.findByPk(argv.customerID);
  if (!customer) {
    throw new Error(`Platform customer ${argv.customerID} not found`);
  }
  const customerAuthToken = getApplicationManagementAuthToken(
    customer.id,
    customer.sharedSecret
  );
  console.log(customerAuthToken);
}
main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=generate-customer-auth-token.js.map
