import express from "express";
import cors from "cors";
import { userRouter } from "./routes/auth";
import { projectRouter } from "./routes/projects";
import { TaskRouter } from "./routes/tasks";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 5 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", userRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", TaskRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
