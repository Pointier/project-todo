import express, { Request, Response, NextFunction, Router } from "express";
import verifyTokenRouter from "./verifyToken";
import { db } from "../dbConnection";
import { tasksTable } from "../drizzle/schema/schema";

const router = Router();
router.use(verifyTokenRouter);

router.post("/tasks", async (req: Request, res: Response): Promise<any> => {
  const userUID = req.user?.uid;
  if (!userUID) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
  }
  const { name, description, date } = req.body;
  console.log(`name: ${name} desc: ${description} date: ${date}`);
  try {
    await db.insert(tasksTable).values({
      userUid: userUID,
      title: name,
      description: description,
      date: date,
    });
    return res.status(200).json("Task successfully registered");
  } catch (error) {
    console.error("Error inserting task in db");
    return res.status(500).json({
      error: "An error occurred while storing the task",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
