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
exports.projectRouter = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../../middleware/user"));
exports.projectRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.projectRouter.get("/projects/bulk", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield prisma.project.findMany({});
        if (!projects) {
            res.status(404).send("project not found");
        }
        res.status(200).send(projects);
    });
});
exports.projectRouter.post("/project/create", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // if (!req.user || !req.user.id) {
            //   res.status(401).json({ error: "User not authenticated properly" });
            //   return;
            // }
            let body = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const project = yield prisma.project.create({
                data: {
                    name: body.name,
                    description: body.description,
                    status: body.Status,
                    dueDate: new Date(body.dueDate),
                    userId: userId || "",
                },
            });
            res.status(200).send(project);
        }
        catch (e) {
            console.error("Error creating project:", e);
            res.status(500).json({ error: "Failed to create project" });
            return;
        }
    });
});
exports.projectRouter.get("/project/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield prisma.project.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!project) {
            res.status(404).send("Project not found");
        }
        res.status(200).send(project);
    });
});
exports.projectRouter.put("/project/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const body = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const UpdatedProject = yield prisma.project.upsert({
            where: {
                id: req.params.id,
            },
            update: {
                name: body.name,
                description: body.description,
                status: body.status,
            },
            create: {
                name: body.name,
                description: body.description,
                status: body.status,
                userId: userId,
                dueDate: body.dueDate,
            },
        });
        if (!UpdatedProject) {
            res.status(411).send("project not updated");
        }
        res.status(200).send(UpdatedProject);
    });
});
exports.projectRouter.delete("/project/:id", user_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteProject = yield prisma.project.delete({
            where: {
                id: req.params.id,
            },
        });
        if (!deleteProject) {
            res.status(424).send("project not deleted");
        }
        res.status(200).send("project deleted");
    });
});
