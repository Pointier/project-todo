import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/");

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

// Protect the /api/user route
router.get("/", ensureAuthenticated, (req: Request, res: Response) => {
  res.json({ user: req.user });
});
export default router;
