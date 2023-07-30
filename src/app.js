import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./router/User.router.js";
import travelRouter from "./router/Travel.router.js";

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(userRouter);
app.use(travelRouter);
export default app;
