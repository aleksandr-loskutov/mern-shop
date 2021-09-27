const jwt = require("jsonwebtoken");
const config = require("config");
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
            const { roles: userRoles } = jwt.verify(
                token,
                config.get("secretKey")
            );
            let userHaveRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    userHaveRole = true;
                }
            });
            if (!userHaveRole) {
                return res
                    .status(403)
                    .json({ message: "Не авторизованный запрос" });
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
