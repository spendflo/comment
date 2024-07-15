#!/usr/bin/env -S node -r dotenv/config

// scripts/check-database-schema.ts
import { promises as fs2 } from "fs";
import prettier from "prettier";
import yargs from "yargs";

// database/tooling/pg-formatter.ts
import { format } from "pg-formatter";

// database/tooling/migra.ts
import * as child_process2 from "child_process";
import { promises as fs } from "fs";
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
async function executeSqlFile(sqlFilename, database) {
  await run(
    "psql",
    [
      "--echo-errors",
      "--set=ON_ERROR_STOP=t",
      "--single-transaction",
      "--file",
      sqlFilename,
      database
    ],
    { env: makePgEnv() }
  );
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
async function installMigra() {
  if (!await file_exists(venvPath)) {
    console.log("Creating Python virtualenv for installing migra...");
    await run("python3", ["-m", "venv", venvPath]);
    await run(
      "pip",
      ["install", "--upgrade", "pip", "setuptools", "wheel", "packaging"],
      { env: venvEnv }
    );
  }
  if (!await file_exists(migraPath)) {
    console.log("Installing migra in Python virtualenv...");
    await run("pip", ["install", "psycopg2-binary", "migra"], { env: venvEnv });
  }
}
async function migra(dbA, dbB, ...schemas) {
  if (schemas.length === 0) {
    return await migraImpl(dbA, dbB);
  }
  const results = (await Promise.all(schemas.map((schema) => migraImpl(dbA, dbB, schema)))).filter(Boolean);
  if (results.length === 0) {
    return null;
  } else {
    return results.join("\n\n");
  }
}
function migraImpl(dbA, dbB, schema) {
  return new Promise(
    (resolve2, reject) => child_process2.execFile(
      migraPath,
      ["--unsafe", ...schema == null ? [] : ["--schema", schema], dbA, dbB],
      {
        env: venvEnv
      },
      (error, stdout, stderr) => {
        if (error) {
          if (error.code === 2) {
            resolve2(stdout);
          } else {
            console.error(stderr);
            reject(error);
          }
        } else {
          resolve2(null);
        }
      }
    )
  );
}
function runSequelizeMigrate(database, ...extraArgs) {
  return run(
    "npx",
    ["sequelize-cli", "db:migrate", "--env", "pgenv", ...extraArgs || []],
    {
      env: { ...env, PGDATABASE: database }
    }
  );
}
function file_exists(path2) {
  return fs.access(path2).then(
    () => true,
    () => false
  );
}

// scripts/check-database-schema.ts
async function main() {
  const { argv } = yargs(process.argv.slice(2)).option("checkMigrations", {
    type: "boolean",
    description: "Check that all migrations can be applied to an empty database with no errors"
  }).option("checkSchema", {
    type: "boolean",
    description: "Check if schema description can be applied to an empty database with no errors"
  }).option("check", {
    type: "boolean",
    description: "Check that both migrations and schema description can be applied to an empty database with no error and yield identical schema. Any diff that touches the database/ directory should be tested with this option."
  }).option("createMigration", {
    type: "string",
    description: "Create a new database migration that reflects changes in the schema description. You must provide a name for the new migration which will then be saved in database/migrations/<current time>_<name provided>.cjs"
  }).option("checkDatabase", {
    type: "boolean",
    description: "Compare the current live database schema (of the database configured in your .env) against the schema definition file"
  }).help();
  const {
    checkMigrations,
    checkSchema,
    check,
    createMigration,
    checkDatabase
  } = argv;
  if (!(checkMigrations || checkSchema || check || createMigration || checkDatabase)) {
    yargs.showHelp();
    throw null;
  }
  if (createMigration && (checkMigrations || checkSchema || check || checkDatabase)) {
    throw "Do not mix the --createMigration option with other options!";
  }
  if (check || createMigration || checkDatabase) {
    await installMigra();
  }
  const needSchemaDatabase = !!(checkSchema || check || createMigration || checkDatabase);
  const needMigrationsDatabase = !!(checkMigrations || check || createMigration);
  let upMigration = null;
  let downMigration = null;
  await withTemporaryDatabaseIfNeeded(
    needSchemaDatabase,
    async (schemaDatabase) => {
      if (schemaDatabase !== null) {
        try {
          await executeSqlFile("database/schema.sql", schemaDatabase);
        } catch (_) {
          throw "Failed to apply database schema migration to empty database";
        }
      }
      if (needMigrationsDatabase) {
        await withTemporaryDatabase(async (migrationsDatabase) => {
          try {
            await runSequelizeMigrate(migrationsDatabase);
          } catch (_) {
            throw "Failed to apply all database migrations to empty database";
          }
          if ((check || createMigration) && schemaDatabase !== null) {
            downMigration = await migra(
              postgresUrl(schemaDatabase),
              postgresUrl(migrationsDatabase),
              "cord"
            );
            if (check && downMigration !== null) {
              throw "The database migrations are not consistent with the full database schema definition.\nAdding the following statements to the schema definition would make it consistent with the migrations:\n\n" + prepareMigration(downMigration, "", false);
            }
            if (createMigration) {
              if (downMigration === null) {
                throw "No changes to database schema detected. No database migration generated.";
              } else {
                upMigration = await migra(
                  postgresUrl(migrationsDatabase),
                  postgresUrl(schemaDatabase),
                  "cord"
                );
              }
            }
          }
        });
      }
      if (checkDatabase && schemaDatabase) {
        const { POSTGRES_DB } = process.env;
        if (!POSTGRES_DB) {
          throw new Error(
            "Using the --checkDatabase option requires you to set POSTGRES_DB"
          );
        }
        const migration = await migra(
          postgresUrl(schemaDatabase),
          postgresUrl(POSTGRES_DB),
          "cord"
        );
        if (migration === null) {
          console.log(
            "The configured database's schema is consistent with the schema definition"
          );
        } else {
          throw "The configured database's schema is not consistent with the full database schema definition.\nAdding the following statements to the schema definition would make it consistent with the database:\n\n" + prepareMigration(migration, "", false);
        }
      }
    }
  );
  if (createMigration) {
    const migrationFile = `'use strict';

          module.exports = {
            up: (queryInterface) =>
              queryInterface.sequelize.query(\`${prepareMigration(
      upMigration ?? ""
    )}\`),
           down: (queryInterface) =>
              queryInterface.sequelize.query(\`${prepareMigration(
      downMigration ?? ""
    )}\`),
          };`;
    const now = /* @__PURE__ */ new Date();
    const timestamp = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, "0") + now.getUTCDate().toString().padStart(2, "0") + now.getUTCHours().toString().padStart(2, "0") + now.getUTCMinutes().toString().padStart(2, "0") + now.getUTCSeconds().toString().padStart(2, "0");
    const filename = `database/migrations/${timestamp}-${createMigration}.cjs`;
    const formattedMigrationFile = await prettier.format(migrationFile, {
      filepath: filename,
      ...await prettier.resolveConfig(filename)
    });
    await fs2.writeFile(filename, formattedMigrationFile);
    console.log(`New database written to ${filename}`);
  }
}
function prepareMigration(sql, indent = "      ", transaction = true) {
  sql = format(sql.trim(), { keywordCase: "uppercase", noRcFile: true }).trim();
  if (transaction) {
    sql = `
BEGIN;

${sql}

COMMIT;`;
  }
  return sql.replace(/\n/g, `
${indent}`).replace(/ +(\n|$)/g, "$1");
}
function postgresUrl(database) {
  const u = new URL("postgresql://");
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;
  if (POSTGRES_USER) {
    u.username = POSTGRES_USER;
  }
  if (POSTGRES_PASSWORD) {
    u.password = POSTGRES_PASSWORD;
  }
  if (POSTGRES_HOST) {
    if (POSTGRES_HOST[0] === "/") {
      u.searchParams.append("host", POSTGRES_HOST);
    } else {
      u.host = encodeURIComponent(POSTGRES_HOST);
    }
  }
  if (POSTGRES_PORT) {
    u.port = POSTGRES_PORT;
  }
  u.pathname = database;
  return u.toString();
}
function withTemporaryDatabaseIfNeeded(needed, func) {
  if (needed) {
    return withTemporaryDatabase(func);
  } else {
    return func(null);
  }
}
main().then(
  () => {
    process.exit(0);
  },
  (err) => {
    if (err != null) {
      console.error("\n");
      console.error(err);
    }
    process.exit(1);
  }
);

//# sourceMappingURL=check-database-schema.js.map
