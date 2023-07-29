import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./router/User.router.js";

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(userRouter);

export default app;
