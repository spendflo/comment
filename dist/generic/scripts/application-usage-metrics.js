#!/usr/bin/env -S node --enable-source-maps

// scripts/application-usage-metrics.ts
import "dotenv/config.js";
import Pg from "pg";
import yargs from "yargs";

// server/src/metrics/applicationUsageMetrics.ts
var applicationUsageMetricTypes = [
  "number_of_messages",
  "users_sent_message",
  "users_sent_message_7d",
  "users_sent_message_28d",
  "users_activated",
  "users_activated_7d",
  "users_activated_28d",
  "users_exposed_to_cord",
  "users_exposed_to_cord_7d",
  "users_exposed_to_cord_28d"
];
function isApplicationUsageMetricType(x) {
  return typeof x === "string" && applicationUsageMetricTypes.includes(x);
}
var applicationUsageMetricsQueries = () => ({
  number_of_messages: {
    // Group all messages by application ID (via their orgID) and the date part
    // of the timestamp and count the number of messages with each appID/date
    // combination. That simply gives us the number of messages written per day
    // in an application.
    query: `
        SELECT
            o."platformApplicationID" AS "applicationID",
            metrics_day(m.timestamp) AS "date",
            COUNT(m) AS "value"
        FROM messages m
        INNER JOIN orgs o ON m."orgID"=o.id
        WHERE o."platformApplicationID" IS NOT NULL
        GROUP BY 1, 2`
  },
  users_sent_message: usersSentMessage(1),
  users_sent_message_7d: usersSentMessage(7),
  users_sent_message_28d: usersSentMessage(28),
  users_activated: usersActivated(1),
  users_activated_7d: usersActivated(7),
  users_activated_28d: usersActivated(28),
  users_exposed_to_cord: usersExposedToCord(1),
  users_exposed_to_cord_7d: usersExposedToCord(7),
  users_exposed_to_cord_28d: usersExposedToCord(28)
});
function usersSentMessage(windowDays) {
  return {
    query: `
      SELECT
        o."platformApplicationID" AS "applicationID",
        metrics_day(m.timestamp) + s.shift AS "date",
        COUNT(DISTINCT m."sourceID") AS "value"
      FROM (SELECT generate_series(0, $1-1) AS shift) s
      CROSS JOIN messages m
      INNER JOIN orgs o ON m."orgID"=o.id
      WHERE o."platformApplicationID" IS NOT NULL
      GROUP BY 1, 2`,
    bind: [windowDays]
  };
}
function usersActivated(windowDays) {
  return {
    query: `
      WITH thread_actions AS NOT MATERIALIZED (
        SELECT DISTINCT
          "threadID",
          "sourceID" AS "userID",
          "orgID",
          metrics_day(timestamp) AS "day"
        FROM messages
        UNION
        SELECT m."threadID", mr."userID", m."orgID", metrics_day(mr.timestamp)
        FROM message_reactions mr INNER JOIN messages m ON mr."messageID"=m.id
      ), thread_user_first_action AS NOT MATERIALIZED (
        SELECT
          "threadID", "userID", "orgID",
          min("day") AS "day"
        FROM thread_actions GROUP BY 1, 2, 3
      ), thread_becomes_active AS (
        SELECT DISTINCT
          "threadID",
          nth_value(day, 2) OVER w AS day
        FROM thread_user_first_action
        WINDOW w AS (PARTITION BY "threadID" ORDER BY day ASC)
      )
      SELECT
        o."platformApplicationID" AS "applicationID",
        ta.day + s.shift AS "date",
        COUNT(DISTINCT ta."userID") AS "value"
      FROM (SELECT generate_series(0, $1-1) AS shift) s
      CROSS JOIN thread_actions ta
      INNER JOIN orgs o ON ta."orgID"=o.id
      INNER JOIN thread_becomes_active tba USING("threadID")
      WHERE o."platformApplicationID" IS NOT NULL
      AND ta.day >= tba.day
      GROUP BY 1, 2`,
    bind: [windowDays]
  };
}
function usersExposedToCord(windowDays) {
  return {
    query: `
      SELECT
        e."platformApplicationID" AS "applicationID",
        metrics_day(e."serverTimestamp") + s.shift AS "date",
        COUNT(DISTINCT e."userID") AS "value"
      FROM (SELECT generate_series(0, $1-1) AS shift) s
      CROSS JOIN events e
      WHERE e."platformApplicationID" IS NOT NULL
      AND e.type = 'sdk-components-used'
      GROUP BY 1,2`,
    bind: [windowDays]
  };
}

// common/util/index.ts
import md5 from "blueimp-md5";
import jsonStableStringify2 from "fast-json-stable-stringify";
import { unique } from "radash";
import shajs from "sha.js";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar.js";
import isBetween from "dayjs/plugin/isBetween.js";

// common/types/index.ts
import jsonStableStringify from "fast-json-stable-stringify";

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

// opensource/sdk-js/packages/react/common/lib/messageNode.ts
import { Element } from "slate";
import { v4 as uuid } from "uuid";

// common/util/index.ts
var uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
var assertUUID = (value) => {
  if (!uuidRegex.test(value)) {
    throw new Error(`Invalid UUID ${value}`);
  } else {
    return value;
  }
};
dayjs.extend(Calendar);
dayjs.extend(isBetween);

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

// scripts/application-usage-metrics.ts
var argv = yargs(process.argv.slice(2)).option("appID", {
  type: "string",
  demandOption: true,
  description: "id of application for which metrics will be calculated"
}).option("metric", {
  type: "string",
  demandOption: true,
  description: "name of metric to calculate",
  choices: applicationUsageMetricTypes
}).option("days", {
  type: "number",
  default: 30,
  description: "number of days"
}).strict().help().alias("help", "h").argv;
var { appID, metric, days } = argv;
async function main() {
  if (!isApplicationUsageMetricType(metric)) {
    throw new Error(`Unknown metric: ${metric}`);
  }
  assertUUID(appID);
  if (typeof days !== "number" || days <= 0) {
    throw new Error(`Invalid value for --days: ${days}`);
  }
  const config = getReadReplicaDbConfigFromEnv(process.env);
  const pg = new Pg.Client(config);
  await pg.connect();
  await pg.query("SET search_path=cord,public;");
  const metricQueries = applicationUsageMetricsQueries();
  const mq = metricQueries[metric];
  const query = mq.query;
  const bind = mq.bind ? [...mq.bind] : [];
  bind.push(days);
  const daysPlaceholder = `$${bind.length}`;
  bind.push(appID);
  const appIDPlaceholder = `$${bind.length}`;
  const wrappedQuery = `  WITH q AS (${query.trim()})
  SELECT
    d.date::text AS "date",
    q.value::integer AS "value"
  FROM applications a
  CROSS JOIN (
    SELECT CURRENT_DATE-generate_series(1,${daysPlaceholder}) AS "date"
  ) d
  LEFT OUTER JOIN q ON (q."applicationID", q."date")=(a."id", d."date")
  WHERE a.id = ${appIDPlaceholder}
  AND d."date" >= a."createdTimestamp"::date
  ORDER BY d."date";`;
  const startTime = performance.now();
  const { rows } = await pg.query(
    wrappedQuery,
    bind
  );
  const endTime = performance.now();
  console.log(`Query time: ${endTime - startTime}ms`);
  for (const { date, value } of rows) {
    console.log(`${date} : ${value ?? "null (meaning 0)"}`);
  }
}
main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

//# sourceMappingURL=application-usage-metrics.js.map
