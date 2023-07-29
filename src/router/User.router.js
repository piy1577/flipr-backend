import { Router } from "express";
import { Signup } from "./User.controller.js";

const userRouter = Router();

userRouter.post("/signup", Signup);
userRouter.post("/login");

export default userRouter;
