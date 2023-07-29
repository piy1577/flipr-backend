import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const URI = process.env.DATABASE_URL.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose.connection.once("open", () => {
    console.log(`Db Connected`);
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connect(URI).then(() =>
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    })
);
