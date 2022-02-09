const tokenService = require("../services/token.service");
module.exports = function (req, res, next) {
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
        const userDecodedData = tokenService.validateAccess(token);
        if (!userDecodedData) {
            return res
                .status(403)
                .json({ message: "Не авторизованный запрос" });
        }
        req.user = userDecodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Не авторизованный запрос" });
    }
};
