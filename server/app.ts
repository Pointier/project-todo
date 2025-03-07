import express, { NextFunction, Request, Response } from "express";
import user from "./route/user";
import userStore from "./route/userStore";
import tasks from "./route/tasks";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./drizzle/schema/schema";
import cors from "cors";
import session from "express-session";
import { takeCoverage } from "v8";

config({ path: ".env" });

const pool = new Pool({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "",
});

const db = drizzle({ client: pool });

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

//app.use(express.urlencoded({ extended: false }));

//TODO: use express session ?
// TODO: modify to add routing

app.use("/user", user);

app.use("/", userStore);

app.use("", tasks);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
