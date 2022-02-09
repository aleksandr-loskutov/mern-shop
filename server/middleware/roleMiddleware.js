const tokenService = require("../services/token.service");
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res
                    .status(403)
                    .json({ message: "Не авторизованный запрос" });
            }
            const user = tokenService.validateAccess(token);
            if (user && !roles.includes(user.role)) {
                return res
                    .status(403)
                    .json({ message: "Не авторизованный запрос" });
            }
            if (!req.user) {
                req.user = user;
            }
            next();
        } catch (e) {
            console.log(e);
            return res
                .status(403)
                .json({ message: "Не авторизованный запрос" });
        }
    };
};
