const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check } = require("express-validator");
const router = new Router();
const controller = require("../controllers/authController");

router.post(
    "/registration",
    [
        check("email", "Введите корректный Email").isEmail(),
        check("password", "Пароль должен быть от 4 до 15 символов").isLength({
            min: 4,
            max: 15
        })
    ],
    controller.registration
);
router.post("/login", controller.login);
router.post("/users", controller.getUsers);

module.exports = router;
