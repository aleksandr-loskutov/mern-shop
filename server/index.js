const express = require("express");
const db = require("./models/index");
const config = require("config");
const authRouter = require("./routes/authRouter");
const initDatabase = require("./startup/initDatabase");
const PORT = config.get("serverPort") ?? 4000;
const DB_URL = config.get("dbUrl");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
    console.log("Production");
} else {
    console.log("Development");
}

const start = async () => {
    try {
        db.mongoose.connection.once("open", () => {
            initDatabase();
        });
        await db.mongoose.connect(DB_URL, {
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
