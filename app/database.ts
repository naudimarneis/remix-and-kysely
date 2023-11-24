import type { Database } from "./types.js"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "remix",
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432,
    max: 5,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
