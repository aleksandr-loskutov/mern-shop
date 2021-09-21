const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const PORT = config.get("serverPort");
const app = express();

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log("server started on port", PORT);
        });
    } catch (e) {
        console.log("ошибка", e.message());
    }
};
start();
