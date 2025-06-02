import express, { Request, Response, NextFunction, Router } from "express";
import verifyTokenRouter from "./verifyToken";
import { db } from "../dbConnection";
import { tasksTable } from "../drizzle/schema/schema";
import { eq } from "drizzle-orm";

const router = Router();
router.use(verifyTokenRouter);
function requireUserUid(req: Request, res: Response, next: NextFunction): void {
  if (!req.user?.uid) {
    res.status(401).json({ error: "Unauthorized: User not logged in" });
    return;
  }
  next();
}

router.use(requireUserUid);

router.post("/tasks/add", async (req: Request, res: Response): Promise<any> => {
  const userUID = req.user!.uid;
  const { name, description, date, hasHour, startHour, endHour, isRecurring } =
    req.body;
  console.log(`name: ${name} desc: ${description} date: ${date}`);
  try {
    const taskData = {
      userUid: userUID,
      title: name,
      description: description,
      date: date,
      has_hour: hasHour,
      is_recurring: isRecurring,
      startHour: null,
      endHour: null,
    };
    if (hasHour) {
      taskData.startHour = startHour;
      taskData.endHour = endHour;
    }
    await db.insert(tasksTable).values(taskData);
    return res.status(200).json("Task successfully registered");
  } catch (error) {
    console.error("Error inserting task in db");
    return res.status(500).json({
      error: "An error occurred while storing the task: " + error,
    });
  }
});

router.post(
  "/tasks/edit",
  async (req: Request, res: Response): Promise<any> => {},
);

router.post(
  "/tasks/delete",
  async (req: Request, res: Response): Promise<any> => {
    const userUID = req.user!.uid;
    const { id } = req.body;
    try {
      const taskDelete = await db
        .delete(tasksTable)
        .where(eq(tasksTable.id, id));
      return res.status(200).json(taskDelete);
    } catch (error) {
      console.error("Error deleting task in db");
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the task: " + error });
    }
  },
);
router.get(
  "/tasks/getAll",
  async (req: Request, res: Response): Promise<any> => {
    const userUID = req.user!.uid;
    try {
      const tasks = await db
        .select({
          id: tasksTable.id,
          title: tasksTable.title,
          description: tasksTable.description,
          date: tasksTable.date,
          hasHour: tasksTable.has_hour,
          startHour: tasksTable.startHour,
          endHour: tasksTable.endHour,
          isRecurring: tasksTable.is_recurring,
        })
        .from(tasksTable)
        .where(eq(tasksTable.userUid, userUID));
      return res.status(200).json(tasks);
    } catch (error) {
      console.log("Error trying to get a task");
      return res
        .status(500)
        .json({ error: "An error occured while getting all tasks: " + error });
    }
  },
);

export default router;
