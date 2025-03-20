import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import isAuthenticated from "../../middleware/user";

export const projectRouter = Router();
const prisma = new PrismaClient();

projectRouter.get("/projects/bulk", isAuthenticated, async function (req, res) {
  const projects = await prisma.project.findMany({});
  if (!projects) {
    res.status(404).send("project not found");
  }

  res.status(200).send(projects);
});

projectRouter.post(
  "/project/create",
  isAuthenticated,
  async function (req, res) {
    try {

      // if (!req.user || !req.user.id) {
      //   res.status(401).json({ error: "User not authenticated properly" });
      //   return;
      // }

      let body = req.body;
      const userId = req.user?.id;
      const project = await prisma.project.create({
        data: {
          name: body.name,
          description: body.description,
          status: body.Status,
          dueDate: new Date(body.dueDate),
          userId: userId || "",
        },
      });
      res.status(200).send(project);
    } catch (e) {
      console.error("Error creating project:", e);
      res.status(500).json({ error: "Failed to create project" });
      return;
    }
  }
);

projectRouter.get("/project/:id", isAuthenticated, async function (req, res) {
  const project = await prisma.project.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!project) {
    res.status(404).send("Project not found");
  }
  res.status(200).send(project);
});

projectRouter.put("/project/:id", isAuthenticated, async function (req, res) {
  const body = req.body;
  const userId = (req.user as { id: string })?.id;
  const UpdatedProject = await prisma.project.upsert({
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

projectRouter.delete(
  "/project/:id",
  isAuthenticated,
  async function (req, res) {
    const deleteProject = await prisma.project.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteProject) {
      res.status(424).send("project not deleted");
    }
    res.status(200).send("project deleted");
  }
);
