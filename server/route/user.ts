import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/");

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  res.status(401).json({ error: "Not Connected" });
}

router.get("/", ensureAuthenticated, (req: Request, res: Response) => {});

export default router;
