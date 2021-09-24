const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth");
const PORT = config.get("serverPort");
const DB_URL = config.get("dbUrl");
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log("server started on port", PORT);
        });
    } catch (e) {
        console.log("ошибка", e);
    }
};
start();
