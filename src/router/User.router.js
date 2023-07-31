import { Router } from "express";
import {
    Signup,
    book,
    favorite,
    isLoggedin,
    login,
    payment,
    paymentVerification,
    getKey,
} from "./User.controller.js";

const userRouter = Router();

userRouter.post("/signup", Signup);
userRouter.post("/login", login);
userRouter.post("/isloggedin", isLoggedin);
userRouter.post("/book", book);
userRouter.post("/favorite", favorite);
userRouter.post("/payment", payment);
userRouter.post("/payment/verification", paymentVerification);
userRouter.get("/payment/getkey", getKey);

export default userRouter;
