import express, { Request, Response, Router } from "express";
import { db } from "../dbConnection";
import { usersTable } from "../drizzle/schema/schema";

const router = express.Router();

router.post(
  "/store-user",
  async (req: Request, res: Response): Promise<void> => {
    const { uid } = req.body;
    if (!uid) {
      res.status(400).json({ error: "UID is required" });
    }
    try {
      await db.insert(usersTable).values({ uid: uid, name: "Placeholder" });
      res.status(200).json({ message: "User stored successfully" });
    } catch (error) {
      console.error("Error storing user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while storing the user" });
    }
  },
);

export default router;
