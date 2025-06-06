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
const dbConnection_1 = require("../dbConnection");
const schema_1 = require("../drizzle/schema/schema");
const router = express_1.default.Router();
router.post("/store-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: "UID is required" });
    }
    try {
        yield dbConnection_1.db.insert(schema_1.usersTable).values({ uid: uid, name: "Placeholder" });
        return res.status(200).json({ message: "User stored successfully" });
    }
    catch (error) {
        console.error("Error storing user:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while storing the user" });
    }
}));
exports.default = router;
