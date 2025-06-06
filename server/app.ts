import express, { NextFunction, Request, Response } from "express";
import user from "./route/user";
import userStore from "./route/userStore";
import tasks from "./route/tasks";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import cors from "cors";

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

const db = drizzle({ client: pool });

const app = express();
const port = Number(process.env.PORT);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://project-todo-hown.onrender.com",
      "https://pointier.github.io",
    ],
    credentials: true,
  }),
);

app.use(express.json());

//app.use(express.urlencoded({ extended: false }));

//TODO: use express session ?
// TODO: modify to add routing

app.use("/user", user);

app.use("/", userStore);

app.use(tasks);
app.listen(port, "0.0.0.0", () => {
  console.log(`server running at http://localhost:${port}`);
});
