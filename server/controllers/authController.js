const User = require("../models/user");
const Role = require("../models/role");
const config = require("config");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const tokenService = require("../services/token.service");
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
            //const userRole = await Role.findOne({ value: "user" });
            const hashPassword = bcrypt.hashSync(password, 7);
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
            return res.status(201).json({
                message: "Пользователь успешно зарегистрирован!",
                tokens,
                user: { _id: user._id, role: user.role }
            });
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
            return res.json({
                message: "Пользователь успешно авторизован!",
                tokens,
                user: { _id: user._id, role: user.role }
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
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
                _id: data._id
            });
            await tokenService.save(data._id, tokens.refreshToken);
            res.status(200).send({ ...tokens, _id: data._id });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
        function isTokenInvalid(data, dbToken) {
            return !data || !dbToken || data._id !== dbToken?.user?.toString();
        }
    }
    async checkAuth(req, res) {
        try {
            // const token = tokenService.generate({
            //     id: req.user._id,
            //     role: req.user.role
            // });
            // return res.json({
            //     token
            // });
            //
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }
}
// function generateAccessToken(id, role) {
//     const payload = {
//         id,
//         role
//     };
//     return jwt.sign(payload, config.get("secretKey"), {
//         expiresIn: "24h"
//     });
// }
module.exports = new AuthController();
