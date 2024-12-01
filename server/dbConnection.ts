import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./drizzle/schema/schema";
config({ path: ".env" });

const pool = new Pool({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "",
});

export const db = drizzle({ client: pool });
