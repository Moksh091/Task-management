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
exports.TaskRouter = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../../middleware/user"));
exports.TaskRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.TaskRouter.get("/projects/:projectId/tasks", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield prisma.task.findMany({});
        if (!tasks) {
            res.status(404).send("tasks not found");
        }
        res.status(200).send(tasks);
    });
});
exports.TaskRouter.post("/projects/:projectId/task", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const body = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const task = yield prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                dueDate: new Date(body.dueDate),
                projectId: userId,
            },
        });
        res.status(200).send(task);
    });
});
exports.TaskRouter.get("/task/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield prisma.task.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!task) {
            res.status(404).send("task not found");
        }
        res.status(200).send(task);
    });
});
exports.TaskRouter.put("/task/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const body = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const task = yield prisma.task.upsert({
            where: {
                id: req.params.id,
            },
            update: {
                title: body.title,
                description: body.description,
                status: body.status,
                dueDate: body.dueDate,
            },
            create: {
                title: body.title,
                description: body.description,
                status: body.status,
                dueDate: body.dueDate,
                projectId: userId,
            },
        });
        if (!task) {
            res.status(404).send("task not found");
        }
        res.status(200).send(task);
    });
});
exports.TaskRouter.delete("/task/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteTask = yield prisma.task.delete({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteTask) {
            res.status(500).send("failed");
        }
        res.status(200).send("deleted");
    });
});
