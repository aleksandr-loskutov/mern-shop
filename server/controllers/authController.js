const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
class AuthController {
    async registration(req, res) {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким Email уже существует"
                });
            }
            const userRole = await Role.findOne({ value: "user" });
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                email,
                password: hashPassword,
                roles: [userRole.value]
            });
            await user.save();
            return res.json({
                message: "Пользователь успешно зарегистрирован!"
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка регистрации" });
        }
    }
    async login(req, res) {
        try {
        } catch (e) {}
    }
    async getUsers(req, res) {
        try {
        } catch (e) {}
    }
}
module.exports = new AuthController();
