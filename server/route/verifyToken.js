"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = __importDefault(require("../firebaseConfig"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Missing authorization" });
    }
    const idToken = authHeader.split("Bearer ")[1];
    console.log("idToken: ", idToken);
    try {
        const decodedToken = yield firebaseConfig_1.default.auth().verifyIdToken(idToken);
        req.user = decodedToken;
    }
    catch (error) {
        console.log("Error in verifying token: ", error);
    }
    next();
});
const verifyTokenRouter = express_1.default.Router();
verifyTokenRouter.use(verifyToken);
exports.default = verifyTokenRouter;
