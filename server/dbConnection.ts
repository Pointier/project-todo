import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./drizzle/schema/schema";
config({ path: ".env" });

const isProduction = process.env.NODE_ENV === "production";
let pool: Pool;
if (isProduction && process.env.DB_URL) {
  pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "",
  });
}

export const db = drizzle({ client: pool });
