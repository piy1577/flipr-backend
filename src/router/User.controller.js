import UserModel from "../model/User.model.js";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";

console.log(process.env.JWT_SECRET);

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});
const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
    return token;
};

const errorHandler = (err) => {
    let error = { name: "", phoneNumber: "", email: "", password: "" };
    if (err.message === "invalid Email") {
        error.email = "invalid email";
        return error;
    }

    if (err.message === "invalid password") {
        error.password = "invalid password";
        return error;
    }
    if (err.code === 11000) {
        error = { message: "Account already exists" };
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach((item) => {
            if (item.path === "name") {
                error.name = item.properties.message;
            }
            if (item.path === "phoneNumber") {
                error.phoneNumber = item.properties.message;
            }
            if (item.path === "email") {
                error.email = item.properties.message;
            }
            if (item.path === "password") {
                error.password = item.properties.message;
            }
        });
    }
    return error;
};

export const Signup = async (req, res) => {
    const { email, password, name, phoneNumber } = req.body;
    try {
        const user = await UserModel.create({
            email,
            password,
            name,
            phoneNumber,
        });
        if (user) {
            user.password = null;
            const token = createToken(user.id);
            res.status(200).json({ success: true, token, user });
        } else {
            res.status(400).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        const error = errorHandler(err);
        res.status(400).json({ success: false, error });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        user.password = undefined;
        res.status(200).json({ success: true, user, token });
    } catch (err) {
        const error = errorHandler(err);
        res.status(401).json({ success: false, error });
    }
};

export const isLoggedin = async (req, res) => {
    const token = req.headers.authorization.trim().split(" ")[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById({ _id: id });
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(401).send({ success: false });
    }
};

export const book = async (req, res) => {
    const { booked } = req.body;
    const token = req.headers.authorization.trim().split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await UserModel.updateOne(
            { _id: id },
            { booked },
            { upsert: true }
        );
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: true });
    }
};

export const favorite = async (req, res) => {
    const { favorite } = req.body;
    const token = req.headers.authorization.trim().split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await UserModel.updateOne(
            { _id: id },
            { favorite },
            { upsert: true }
        );
        if (user) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: true });
    }
};

export const payment = async (req, res) => {
    const { amount } = req.body;
    const option = { amount: Number(amount * 100), currency: "INR" };
    try {
        const order = await instance.orders.create(option);
        res.status(200).json({ succes: true, order });
    } catch (err) {
        console.log(err);
    }
};

export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
};

export const getKey = async (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};
