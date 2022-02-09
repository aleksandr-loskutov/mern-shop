const Router = require("express");
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
router.post(
    "/login",
    [
        check("email", "Введите корректный Email").normalizeEmail().isEmail(),
        check("password", "Пароль должен содержать от 4 символов").isLength({
            min: 4
        })
    ],
    controller.login
);
router.post("/token", controller.token);
module.exports = router;
