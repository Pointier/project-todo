import express, { NextFunction, Request, Response } from "express";
import user from "./route/user";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./drizzle/schema/schema";
import bcrypt from "bcryptjs";
import cors from "cors";
import session from "express-session";

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

app.use(
  session({
    secret: "doggo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax", // Add this
    },
    rolling: true, // Extend session on each request
  }),
);
app.use(express.urlencoded({ extended: false }));

// TODO: modify to add routing

// TODO: bcrypt salted for password, force https and protect against bot spam ?
// TODO: learn about session like cookie ...(express-session or other ?)
// TODO: cant add the same username



app.use("/user", user);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
