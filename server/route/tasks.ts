import express, { Request, Response } from "express";
const router = express.Router();

router.get("/");
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("test");
    res.status(201).send("test");
  } catch (err) {
    console.log(err);
  }
});

export default router;
