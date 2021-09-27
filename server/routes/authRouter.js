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
router.post("/login", controller.login);
router.post("/users", roleMiddleware(["admin"]), controller.getUsers);
module.exports = router;
