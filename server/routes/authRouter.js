const Router = require("express");
const { check } = require("express-validator");
const router = new Router();
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
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
router.post("/users", roleMiddleware(["admin"]), controller.getUsers);
router.post("/token", controller.token);
router.get("/auth", authMiddleware, controller.checkAuth);
module.exports = router;
