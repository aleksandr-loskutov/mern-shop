const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/token");
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("secretKey"), {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign(payload, config.get("refreshSecretKey"));

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    async save(userId, refreshToken) {
        const data = await Token.findOne({ user: userId });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }
        return await Token.create({ user: userId, refreshToken });
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshSecretKey"));
        } catch (e) {
            return null;
        }
    }
    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get("secretKey"));
        } catch (e) {
            return null;
        }
    }
    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();
