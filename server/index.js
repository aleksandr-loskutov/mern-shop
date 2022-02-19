const express = require("express");
const db = require("./models/index");
const path = require("path");
const config = require("config");
const authRouter = require("./routes/authRouter");
const initDatabase = require("./startup/initDatabase");
const PORT = config.get("serverPort") ?? 8080;
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
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

const start = async () => {
  try {
    db.mongoose.connection.once("open", () => {
      initDatabase();
    });
    await db.mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log("server started on port", PORT);
    });
  } catch (e) {
    console.log("ошибка", e);
  }
};
start();
