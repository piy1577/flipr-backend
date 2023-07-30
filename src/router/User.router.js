import { Router } from "express";
import { Signup, isLoggedin, login } from "./User.controller.js";

const userRouter = Router();

userRouter.post("/signup", Signup);
userRouter.post("/login", login);
userRouter.post("/isloggedin", isLoggedin);

export default userRouter;
