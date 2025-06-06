import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema/",
  out: "./drizzle/migration/",
  dbCredentials: {
    url: process.env.DB_URL!,
    //    host: process.env.DB_HOST || '',
    //    user: process.env.DB_USER || '',
    //    password: process.env.DB_PASSWORD || '',
    //    port: Number(process.env.DB_PORT) || 5432,
    //    database: process.env.DB_NAME || '',
    //ssl: true,
  },
});
