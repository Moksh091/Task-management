import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isAuthenticated from "../../middleware/user";

export const TaskRouter = Router();
const prisma = new PrismaClient();

TaskRouter.get(
  "/projects/:projectId/tasks",
  isAuthenticated,
  async function (req, res) {
    const tasks = await prisma.task.findMany({});

    if (!tasks) {
      res.status(404).send("tasks not found");
    }
    res.status(200).send(tasks);
  }
);

TaskRouter.post(
  "/projects/:projectId/task",
  isAuthenticated,
  async function (req, res) {
    const body = req.body;
    const userId = (req.user as { id: string })?.id;
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
        projectId: userId,
      },
    });
    res.status(200).send(task);
  }
);

TaskRouter.get(
  "/task/:id",
  isAuthenticated,
  async function (req, res) {
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!task) {
      res.status(404).send("task not found");
    }
    res.status(200).send(task);
  }
);

TaskRouter.put(
  "/task/:id",
  isAuthenticated,
  async function (req, res) {
    const body = req.body;
    const userId = (req.user as { id: string })?.id;
    const task = await prisma.task.upsert({
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
  }
);

TaskRouter.delete(
  "/task/:id",
  isAuthenticated,
  async function (req, res) {
    const deleteTask = await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTask) {
      res.status(500).send("failed");
    }
    res.status(200).send("deleted");
  }
);
