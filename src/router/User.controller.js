import UserModel from "../model/User.model.js";

const errorHandler = (err) => {
    let error = { name: "", phoneNumber: "", email: "", password: "" };
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
            res.status(200).json({ success: true, user });
        } else {
            res.status(400).json({ success: false });
        }
    } catch (err) {
        const error = errorHandler(err);
        console.log(error);
        res.status(400).json({ success: false, error });
    }
};
