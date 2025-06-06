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
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("./verifyToken"));
const dbConnection_1 = require("../dbConnection");
const schema_1 = require("../drizzle/schema/schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
function requireUserUid(req, res, next) {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid)) {
        res.status(401).json({ error: "Unauthorized: User not logged in" });
        return;
    }
    next();
}
router.use(requireUserUid);
router.post("/tasks/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUID = req.user.uid;
    const { name, description, date, hasHour, startHour, endHour, isRecurring } = req.body;
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
        yield dbConnection_1.db.insert(schema_1.tasksTable).values(taskData);
        return res.status(200).json("Task successfully registered");
    }
    catch (error) {
        console.error("Error inserting task in db");
        return res.status(500).json({
            error: "An error occurred while storing the task: " + error,
        });
    }
}));
router.post("/tasks/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.post("/tasks/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUID = req.user.uid;
    const { id } = req.body;
    try {
        const taskDelete = yield dbConnection_1.db
            .delete(schema_1.tasksTable)
            .where((0, drizzle_orm_1.eq)(schema_1.tasksTable.id, id));
        return res.status(200).json(taskDelete);
    }
    catch (error) {
        console.error("Error deleting task in db");
        return res
            .status(500)
            .json({ error: "An error occurred while deleting the task: " + error });
    }
}));
router.get("/tasks/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userUID = req.user.uid;
    try {
        const tasks = yield dbConnection_1.db
            .select({
            id: schema_1.tasksTable.id,
            title: schema_1.tasksTable.title,
            description: schema_1.tasksTable.description,
            date: schema_1.tasksTable.date,
            hasHour: schema_1.tasksTable.has_hour,
            startHour: schema_1.tasksTable.startHour,
            endHour: schema_1.tasksTable.endHour,
            isRecurring: schema_1.tasksTable.is_recurring,
        })
            .from(schema_1.tasksTable)
            .where((0, drizzle_orm_1.eq)(schema_1.tasksTable.userUid, userUID));
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.log("Error trying to get a task");
        return res
            .status(500)
            .json({ error: "An error occured while getting all tasks: " + error });
    }
}));
exports.default = router;
