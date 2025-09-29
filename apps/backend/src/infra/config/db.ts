import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import { Database } from "../database/schemas";
import { env } from "./env";

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: env.DATABASE_URL,
    }),
  }),
});

export default db;
