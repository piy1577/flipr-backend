import UserModel from "../model/User.model.js";
import jwt from "jsonwebtoken";

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
