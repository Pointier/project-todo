import express, { NextFunction, Request, Response } from "express";
import tasks from "./route/tasks";
import user from "./route/user";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./drizzle/schema/schema";
import bcrypt from "bcryptjs";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";

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

app.use(cors());
app.use(express.json());

app.use(session({ secret: "doggo", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// TODO: modify to add routing

// TODO: bcrypt salted for password, force https and protect against bot spam ?
// TODO: learn about session like cookie ...(express-session or other ?)
// TODO: cant add the same username

interface SignUpRequest {
  username: string;
  password: string;
}

app.post(
  "/sign-up",
  async (
    req: Request<{}, {}, SignUpRequest>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(req.body);
      const username: string = req.body.username;
      const password: string = req.body.password;

      if (!username || !password) {
        res.status(400).send("Name and paRsword are required");
      }
      const salt = 10;
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          await db
            .insert(usersTable)
            .values({ name: username, password: hashedPassword });
        }
      });
      res.status(201).send("User signed up successfully");
    } catch (err) {
      console.log("Error:" + err);
      res.status(500).send("Internal server error");
    }
  },
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const query = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.name, username));
      const user = query[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const query = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    const user = query[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

//app.post("/sign-in", passport.authenticate("local"));

app.post("/sign-in", (req, res, next) => {
  console.log("Incoming request:", req.body); // Debug log
  passport.authenticate("local", (err: Error, user: SignUpRequest) => {
    console.log("Authentication result:", { err, user }); // Debug log
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.login(user, (err) => {
      if (err) {
        console.error("Login error:", err); // Debug log
        return next(err);
      }
      res.json({ message: "Signed in successfully", user });
    });
  })(req, res, next);
});

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/tasks", tasks);

app.use("/user", user);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
