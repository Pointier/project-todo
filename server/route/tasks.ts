import express, { Request, Response, NextFunction, Router } from "express";
import verifyTokenRouter from "./verifyToken";

const router = express.Router();
router.use(verifyTokenRouter);

router.post("/tasks", async (req: Request, res: Response) => {
  console.log("User is: ", req.user);
});

export default router;
