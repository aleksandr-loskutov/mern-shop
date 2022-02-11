const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");

class UserController {
    async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            if (userId && userId === req.user._id) {
                const user = await User.findById(req.user._id);
                res.send(user);
            } else {
                res.status(401).json({ message: "Specify correct userId" });
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }

    async getAll(req, res) {
        try {
            const list = await User.find();
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }

    async update(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(401).json({ message: "Specify user id to update" });
            }
            //admin can update anyone
            if (req.user.role === "admin") {
                const newHashedPassword = getNewHashedPassword(req.body);
                if (!newHashedPassword) {
                    delete req.body.password;
                } else {
                    req.body.password = newHashedPassword;
                }
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    req.body,
                    {
                        new: true
                    }
                );
                res.send({ ...updatedUser["_doc"], password: "Your password" });
            } else {
                //not admin can only update self data except role field
                if (
                    userId === req.user._id &&
                    !req.body.role &&
                    req.body.role !== ""
                ) {
                    const newHashedPassword = getNewHashedPassword(req.body);
                    if (!newHashedPassword) {
                        delete req.body.password;
                    } else {
                        req.body.password = newHashedPassword;
                    }
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        req.body,
                        {
                            new: true
                        }
                    );
                    res.send(updatedUser);
                } else {
                    res.status(401).json({ message: "Unauthorized" });
                }
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
}
function getNewHashedPassword(body) {
    return body.password && body.password !== ""
        ? bcrypt.hashSync(body.password, config.get("saltForPasswords"))
        : null;
}
module.exports = new UserController();
