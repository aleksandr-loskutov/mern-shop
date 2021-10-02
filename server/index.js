const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/authRouter");
const PORT = config.get("serverPort");
const DB_URL = config.get("dbUrl");
const app = express();
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

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
