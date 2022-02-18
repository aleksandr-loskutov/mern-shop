const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const config = require("config");

class AuthController {
    async registration(req, res) {
        try {
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
            const hashPassword = bcrypt.hashSync(
                password,
                config.get("saltForPasswords")
            );
            const user = new User({
                email,
                password: hashPassword
            });
            await user.save();
            const tokens = tokenService.generate({
                _id: user._id,
                role: user.role
            });
            await tokenService.save(user._id, tokens.refreshToken);
            return res
                .status(200)
                .send({ tokens, user: { ...user["_doc"], password: "" } });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка регистрации" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при авторизации", errors });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: `Ошибка в паре логин/пароль`
                });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: "Ошибка в паре логин/пароль"
                });
            }
            const tokens = tokenService.generate({
                _id: user._id,
                role: user.role
            });
            await tokenService.save(user._id, tokens.refreshToken);
            return res
                .status(200)
                .send({ ...tokens, userId: user._id, role: user.role });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }

    async token(req, res) {
        try {
            const { refresh_token: refreshToken } = req.body;
            const data = tokenService.validateRefresh(refreshToken);
            const dbToken = await tokenService.findToken(refreshToken);
            if (isTokenInvalid(data, dbToken)) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const tokens = tokenService.generate({
                _id: data._id,
                role: data.role
            });
            await tokenService.save(data._id, tokens.refreshToken);
            res.status(200).send({ ...tokens, _id: data._id, role: data.role });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
        function isTokenInvalid(data, dbToken) {
            return !data || !dbToken || data._id !== dbToken?.user?.toString();
        }
    }
}

module.exports = new AuthController();
