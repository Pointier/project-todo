import express, { Request, Response } from "express";

import passport from "passport";
const router = express.Router();

router.get("/");

router.post("/", async (req: Request, res: Response) => {
  try {
    passport.authenticate("session");
    req.user;
    const user = req.session;
    console.log("test");
    console.log("Session:", req.session);
    console.log("User :", req.user);
    res.status(201).send("test");
  } catch (err) {
    console.log(err);
  }
});

export default router;
