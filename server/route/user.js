"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/");
function ensureAuthenticated(req, res, next) {
    res.status(401).json({ error: "Not Connected" });
}
router.get("/", ensureAuthenticated, (req, res) => { });
exports.default = router;
