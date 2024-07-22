#!/usr/bin/env -S node --enable-source-maps
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

// scripts/pr-server-bootstrap-database.ts
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

// server/src/admin/databaseDump/index.ts
import * as child_process from "child_process";
import Pg from "pg";
import { to as copyTo } from "pg-copy-streams";

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
var RADICAL_ORG_ID = "6bba8678-b14e-4af7-b2f2-05ee807dfa82";
var RADICAL_TEST_ORG_ID = "3689f86d-0c70-40de-a2f0-a4a9ea4994e3";
var CORD_PLATFORM_ORG_ID = "746c0b57-7363-4766-9ee9-7ae8ec7531a8";
var CORD_SDK_TEST_ORG_ID = "edda098d-6db7-4202-a5ac-ff3293b78c47";
var CORD_APPLICATION_ID = "5a076ee9-8b9e-4156-9ac4-871bdc4569ec";
var CORD_SDK_TEST_APPLICATION_ID = "b6501bf5-46f7-4db7-9996-c42dd9f758b0";
var CORD_SAMPLE_TOKEN_CUSTOMER_ID = "1c367aca-37c9-4733-8bef-e9f11a7d0f17";
var CORD_DOCS_SAMPLE_TOKEN_APPLICATION_ID = "aeb2797f-f0a3-485c-a317-4986e2c8343b";
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

// server/src/logging/Logger.ts
import { hostname, userInfo } from "os";
import { serializeError } from "serialize-error";
import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import Transport from "winston-transport";
import * as Sentry from "@sentry/node";

// server/src/entity/application/ApplicationEntity.ts
import { Table as Table4, Column as Column4, Model as Model4 } from "sequelize-typescript";
import { DataTypes as DataTypes4 } from "sequelize";

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
import * as jwt from "jsonwebtoken";

// common/types/index.ts
import jsonStableStringify from "fast-json-stable-stringify";

// server/src/entity/email_notification/EmailOutboundNotificationEntity.ts
import { Table, Column, Model } from "sequelize-typescript";
import { DataTypes } from "sequelize";
var EmailOutboundNotificationEntity = class extends Model {
};
__decorateClass([
  Column({
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  })
], EmailOutboundNotificationEntity.prototype, "id", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "userID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "orgID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "threadOrgID", 2);
__decorateClass([
  Column({
    type: DataTypes.UUID,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "threadID", 2);
__decorateClass([
  Column({
    type: DataTypes.TEXT,
    allowNull: false
  })
], EmailOutboundNotificationEntity.prototype, "email", 2);
EmailOutboundNotificationEntity = __decorateClass([
  Table({
    tableName: "email_notifications",
    timestamps: false
  })
], EmailOutboundNotificationEntity);

// server/src/email/utils.ts
import addrs from "email-addresses";
import isUUID from "validator/lib/isUUID.js";
import replyParser from "node-email-reply-parser";

// server/src/entity/event/EventEntity.ts
import { Table as Table2, Column as Column2, PrimaryKey, Model as Model2 } from "sequelize-typescript";
import { DataTypes as DataTypes2 } from "sequelize";
var EventEntity = class extends Model2 {
};
__decorateClass([
  PrimaryKey,
  Column2({
    type: DataTypes2.UUID,
    defaultValue: DataTypes2.UUIDV4
  })
], EventEntity.prototype, "id", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], EventEntity.prototype, "pageLoadID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], EventEntity.prototype, "installationID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TEXT
  })
], EventEntity.prototype, "version", 2);
__decorateClass([
  Column2({
    type: DataTypes2.JSONB
  })
], EventEntity.prototype, "utmParameters", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], EventEntity.prototype, "userID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], EventEntity.prototype, "orgID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.UUID
  })
], EventEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column2({
    type: DataTypes2.NUMBER
  })
], EventEntity.prototype, "eventNumber", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TIME
  })
], EventEntity.prototype, "clientTimestamp", 2);
__decorateClass([
  Column2({
    type: DataTypes2.TIME
  })
], EventEntity.prototype, "serverTimestamp", 2);
__decorateClass([
  Column2({
    type: DataTypes2.STRING
  })
], EventEntity.prototype, "type", 2);
__decorateClass([
  Column2({
    type: DataTypes2.JSONB,
    defaultValue: {}
  })
], EventEntity.prototype, "payload", 2);
__decorateClass([
  Column2({
    type: DataTypes2.JSONB,
    defaultValue: {}
  })
], EventEntity.prototype, "metadata", 2);
__decorateClass([
  Column2({
    type: DataTypes2.ENUM("prod", "staging", "test", "dev"),
    allowNull: false,
    primaryKey: true
  })
], EventEntity.prototype, "tier", 2);
EventEntity = __decorateClass([
  Table2({
    tableName: "events",
    timestamps: false
  })
], EventEntity);

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
import { Table as Table3, Column as Column3, Model as Model3 } from "sequelize-typescript";
import { DataTypes as DataTypes3 } from "sequelize";
var CustomerEntity = class extends Model3 {
};
__decorateClass([
  Column3({
    type: DataTypes3.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes3.UUIDV4
  })
], CustomerEntity.prototype, "id", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TEXT,
    allowNull: false
  })
], CustomerEntity.prototype, "name", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TEXT
  })
], CustomerEntity.prototype, "sharedSecret", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("verified", "sample"),
    defaultValue: "verified",
    allowNull: false
  })
], CustomerEntity.prototype, "type", 2);
__decorateClass([
  Column3({
    type: DataTypes3.VIRTUAL(DataTypes3.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["custom_s3_bucket"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomS3Bucket", 2);
__decorateClass([
  Column3({
    type: DataTypes3.VIRTUAL(DataTypes3.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["custom_segment_write_key"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomSegmentWriteKey", 2);
__decorateClass([
  Column3({
    type: DataTypes3.VIRTUAL(DataTypes3.BOOLEAN, ["addons"]),
    get() {
      const addons = this.getDataValue("addons");
      return addons["customer_support"] ?? false;
    }
  })
], CustomerEntity.prototype, "enableCustomerSupport", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM(
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
  Column3({
    type: DataTypes3.TIME,
    allowNull: true
  })
], CustomerEntity.prototype, "launchDate", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "slackChannel", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "signupCoupon", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TEXT,
    allowNull: true
  })
], CustomerEntity.prototype, "stripeCustomerID", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("free", "pro", "scale"),
    allowNull: true,
    defaultValue: "free"
  })
], CustomerEntity.prototype, "pricingTier", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("active", "inactive"),
    allowNull: true,
    defaultValue: "inactive"
  })
], CustomerEntity.prototype, "billingStatus", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ENUM("stripe", "manual"),
    allowNull: true,
    defaultValue: null
  })
], CustomerEntity.prototype, "billingType", 2);
__decorateClass([
  Column3({
    type: DataTypes3.JSONB,
    allowNull: false,
    defaultValue: {}
  })
], CustomerEntity.prototype, "addons", 2);
__decorateClass([
  Column3({
    type: DataTypes3.TIME,
    allowNull: true
  })
], CustomerEntity.prototype, "renewalDate", 2);
__decorateClass([
  Column3({
    type: DataTypes3.ARRAY(DataTypes3.TEXT),
    defaultValue: [],
    allowNull: false
  })
], CustomerEntity.prototype, "planDescription", 2);
CustomerEntity = __decorateClass([
  Table3({
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
var ApplicationEntity = class extends Model4 {
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
  Column4({
    type: DataTypes4.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes4.UUIDV4
  })
], ApplicationEntity.prototype, "id", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT,
    allowNull: false
  })
], ApplicationEntity.prototype, "name", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT
  })
], ApplicationEntity.prototype, "sharedSecret", 2);
__decorateClass([
  Column4({ type: DataTypes4.TIME })
], ApplicationEntity.prototype, "createdTimestamp", 2);
__decorateClass([
  Column4({
    type: DataTypes4.JSONB
  })
], ApplicationEntity.prototype, "customEmailTemplate", 2);
__decorateClass([
  Column4({
    type: DataTypes4.BOOLEAN,
    defaultValue: true
  })
], ApplicationEntity.prototype, "enableEmailNotifications", 2);
__decorateClass([
  Column4({
    type: DataTypes4.JSONB
  })
], ApplicationEntity.prototype, "customLinks", 2);
__decorateClass([
  Column4({
    type: DataTypes4.UUID,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customS3Bucket", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT,
    defaultValue: null
  })
], ApplicationEntity.prototype, "segmentWriteKey", 2);
__decorateClass([
  Column4({
    type: DataTypes4.JSONB
  })
], ApplicationEntity.prototype, "customNUX", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT
  })
], ApplicationEntity.prototype, "iconURL", 2);
__decorateClass([
  Column4({
    type: DataTypes4.ENUM("free", "starter", "premium"),
    defaultValue: "free",
    allowNull: false
  })
], ApplicationEntity.prototype, "type", 2);
__decorateClass([
  Column4({
    type: DataTypes4.ENUM(
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
  Column4({
    type: DataTypes4.UUID
  })
], ApplicationEntity.prototype, "supportOrgID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.UUID
  })
], ApplicationEntity.prototype, "supportBotID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT
  })
], ApplicationEntity.prototype, "supportSlackChannelID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT
  })
], ApplicationEntity.prototype, "redirectURI", 2);
__decorateClass([
  Column4({
    type: DataTypes4.UUID,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customerID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.BOOLEAN,
    defaultValue: false
  })
], ApplicationEntity.prototype, "slackConnectAllOrgs", 2);
__decorateClass([
  Column4({
    type: DataTypes4.STRING,
    defaultValue: null
  })
], ApplicationEntity.prototype, "eventWebhookURL", 2);
__decorateClass([
  Column4({
    type: DataTypes4.ARRAY(DataTypes4.TEXT),
    defaultValue: null
  })
], ApplicationEntity.prototype, "eventWebhookSubscriptions", 2);
__decorateClass([
  Column4({
    type: DataTypes4.TEXT,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customSlackAppID", 2);
__decorateClass([
  Column4({
    type: DataTypes4.JSONB,
    defaultValue: null
  })
], ApplicationEntity.prototype, "customSlackAppDetails", 2);
ApplicationEntity = __decorateClass([
  Table4({
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
  prefix: `${"scripts_pr_server_bootstrap_database"}_`
});
var Counter2 = (configuration) => new prom.Counter({ registers: [register], ...configuration });
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
import { Table as Table5, Column as Column5, Model as Model5 } from "sequelize-typescript";
import { DataTypes as DataTypes5 } from "sequelize";
var OrgMembersEntity = class extends Model5 {
};
__decorateClass([
  Column5({
    type: DataTypes5.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgMembersEntity.prototype, "userID", 2);
__decorateClass([
  Column5({
    type: DataTypes5.UUID,
    primaryKey: true,
    allowNull: false
  })
], OrgMembersEntity.prototype, "orgID", 2);
__decorateClass([
  Column5({
    type: DataTypes5.UUID,
    allowNull: true
  })
], OrgMembersEntity.prototype, "platformApplicationID", 2);
__decorateClass([
  Column5({
    type: DataTypes5.TIME
  })
], OrgMembersEntity.prototype, "createdTimestamp", 2);
OrgMembersEntity = __decorateClass([
  Table5({
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

// server/src/logging/Logger.ts
var logLevel = Env_default.LOGLEVEL;
var defaultMeta = {
  process: "scripts_pr_server_bootstrap_database",
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
          tags: { loggingProcessName: "scripts_pr_server_bootstrap_database" },
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

// server/src/admin/databaseDump/index.ts
var { escapeLiteral, escapeIdentifier } = Pg.Client.prototype;
var includedOrgIDs = [
  RADICAL_ORG_ID,
  RADICAL_TEST_ORG_ID,
  CORD_PLATFORM_ORG_ID,
  CORD_SDK_TEST_ORG_ID,
  "084f65aa-5de9-48af-a297-32a17c7fd6f4",
  // clack_all (public channels),
  "644c0620-4799-4469-a202-eb092f76181b"
  // clack_utility_users (users needed for Clack to work)
];
var orgIDsLiteral = `(${includedOrgIDs.map(escapeLiteral).join(",")})`;
async function beginDump(dbconfig, output, func) {
  const pg = new Pg.Client(dbconfig);
  await pg.connect();
  try {
    const psqlClientEnv = {
      ...process.env,
      PGDATABASE: dbconfig.database,
      PGHOST: dbconfig.host,
      PGPORT: dbconfig.port?.toString(),
      PGUSER: dbconfig.user,
      PGPASSWORD: dbconfig.password
    };
    await pg.query("SET search_path=cord,public;");
    await pg.query(
      "BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;"
    ).catch((error) => {
      if (error.toString() === "error: cannot use serializable mode in a hot standby") {
        return pg.query(
          "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;"
        );
      } else {
        return Promise.reject(error);
      }
    });
    const snapshotId = (await pg.query("SELECT pg_export_snapshot() AS id;")).rows[0].id;
    let preData = "BEGIN;\n\n";
    preData += "DROP SCHEMA IF EXISTS cord CASCADE;\n";
    preData += await spawn2(
      "pg_dump",
      [
        `--snapshot=${snapshotId}`,
        "--section=pre-data",
        "--no-owner",
        "--no-acl",
        "--schema=cord"
      ],
      psqlClientEnv
    );
    let postData = await spawn2(
      "pg_dump",
      [
        `--snapshot=${snapshotId}`,
        "--section=post-data",
        "--no-owner",
        "--no-acl",
        "--schema=cord"
      ],
      psqlClientEnv
    );
    preData += "\nSET search_path = cord, public;\n";
    preData += `
      CREATE TABLE IF NOT EXISTS public."SequelizeMeta" (
          name character varying(255) NOT NULL
      );
      TRUNCATE public."SequelizeMeta";`;
    const migrationNames = (await pg.query('SELECT name FROM public."SequelizeMeta" ORDER BY name;')).rows.map((row) => row.name);
    if (migrationNames.length) {
      preData += `
      INSERT INTO public."SequelizeMeta" (name) VALUES ${migrationNames.map((name) => `(${pg.escapeLiteral(name)})`).join(", ")};

`;
    }
    preData += `CREATE OR REPLACE FUNCTION public.gen_random_uuid()
                RETURNS uuid AS 'SELECT uuid_generate_v4();' LANGUAGE SQL;

`;
    postData += "\n\nCOMMIT;\n";
    output.write(preData);
    const result = await func(pg);
    output.write(postData);
    return result;
  } finally {
    pg.end().catch(
      anonymousLogger().exceptionLogger("pg.end() threw exception")
    );
  }
}
function spawn2(command, args, env) {
  return new Promise((resolve, reject) => {
    const proc = child_process.spawn(command, args, {
      stdio: ["ignore", "pipe", "inherit"],
      env
    });
    let stdout = "";
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Child process exited with status ${code}`));
      }
    });
    proc.stdout.on("data", (data) => {
      stdout += data;
    });
  });
}

// server/src/util/readReplicaDatabase.ts
function getReadReplicaDbConfigFromEnv(env) {
  return {
    host: env.POSTGRES_READ_HOST ?? env.POSTGRES_HOST,
    port: Number(env.POSTGRES_READ_PORT ?? env.POSTGRES_PORT),
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD
  };
}

// scripts/pr-server-bootstrap-database.ts
async function main() {
  const output = process.stdout;
  await beginDump(getReadReplicaDbConfigFromEnv(Env_default), output, async (pg) => {
    await copyRows(
      pg,
      output,
      "orgs",
      `SELECT *
         FROM orgs
         WHERE id=$1;`,
      [RADICAL_ORG_ID]
    );
    await copyRows(
      pg,
      output,
      "users",
      `SELECT u.*
         FROM users u
         INNER JOIN org_members om ON om."userID"=u.id AND om."orgID"=$1
         WHERE u.admin AND u.state='active';`,
      [RADICAL_ORG_ID]
    );
    await copyRows(
      pg,
      output,
      "org_members",
      `SELECT om.*
         FROM users u
         INNER JOIN org_members om ON om."userID"=u.id AND om."orgID"=$1
         WHERE u.admin AND u.state='active';`,
      [RADICAL_ORG_ID]
    );
    await copyRows(
      pg,
      output,
      "customers",
      `SELECT c.*
         FROM customers c
         WHERE c.id=ANY($1);`,
      [[CORD_CUSTOMER_ID, CORD_SAMPLE_TOKEN_CUSTOMER_ID]]
    );
    await copyRows(
      pg,
      output,
      "applications",
      `SELECT a.*
         FROM applications a
         WHERE a.id=ANY($1);`,
      [
        [
          CORD_APPLICATION_ID,
          CORD_DOCS_SAMPLE_TOKEN_APPLICATION_ID,
          CORD_SDK_TEST_APPLICATION_ID
        ]
      ]
    );
    output.write(
      'UPDATE applications SET "supportBotID"=NULL, "supportOrgID"=NULL;\n'
    );
  });
}
var returnAllTypesAsStrings = {
  getTypeParser: () => (x) => x
};
async function copyRows(pg, output, tableName, query, values) {
  const result = await pg.query({
    text: query,
    values,
    rowMode: "array",
    types: returnAllTypesAsStrings
  });
  if (result.rows.length > 0) {
    output.write(
      `INSERT INTO ${tableName} (${result.fields.map((field) => pg.escapeIdentifier(field.name)).join(", ")}) VALUES
${result.rows.map(
        (row) => `(${row.map(
          (value) => value === null ? "NULL" : pg.escapeLiteral(value)
        ).join(", ")})`
      ).join(",\n")};
`
    );
  }
}
main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);

//# sourceMappingURL=pr-server-bootstrap-database.js.map
