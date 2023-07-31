import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone Number is required"],
        min: [1000000000, "Phone number should be 10 character long"],
        max: [9999999999, "Phone number should be 10 character long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is registed"],
        validate: [validator.isEmail, "Email is not valid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should be minimum 6 character long"],
    },
    favorite: {
        type: [mongoose.Schema.ObjectId],
        default: [],
    },
    booked: {
        type: [mongoose.Schema.ObjectId],
        default: [],
    },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        if (user.password === null) {
            throw new Error("Use signin with google");
        }
        if (await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            throw new Error("invalid password");
        }
    } else {
        throw new Error("invalid Email");
    }
};

export default mongoose.model("user", userSchema);
