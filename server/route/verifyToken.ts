import express, { Request, Response, NextFunction, Router } from "express";
import admin from "../firebaseConfig";

declare module "express-serve-static-core" {
  interface Request {
    user?: admin.auth.DecodedIdToken;
  }
}
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const authHeader = req.headers.authorization;
  console.log("authHeader: ", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Missing authorization" });
  }
  const idToken = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  req.user = decodedToken;
  next();
};

const verifyTokenRouter = express.Router();

verifyTokenRouter.use(verifyToken);

export default verifyTokenRouter;
