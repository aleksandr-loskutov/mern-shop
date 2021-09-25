const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const AuthRouter = new Router();
const AuthController = require("../controllers/authController");

AuthRouter.post(
    "/registration",
    [
        check("email", "Incorrect email").isEmail(),
        check(
            "password",
            "Password must be longer than 3 and shorter than 12"
        ).isLength({ min: 3, max: 12 })
    ],
    AuthController.registration
);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/users", AuthController.getUsers);

module.exports = AuthRouter;
