"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const projects_1 = require("./routes/projects");
const tasks_1 = require("./routes/tasks");
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const client_1 = require("@prisma/client");
const passport_1 = __importDefault(require("passport"));
const port = 3000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new prisma_session_store_1.PrismaSessionStore(prisma, {
        checkPeriod: 5 * 60 * 1000,
        dbRecordIdIsSessionId: true,
    }),
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/v1", auth_1.userRouter);
app.use("/api/v1", projects_1.projectRouter);
app.use("/api/v1", tasks_1.TaskRouter);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
