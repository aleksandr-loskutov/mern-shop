const User = require("../models/user");
const bcrypt = require("bcryptjs");
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

    async get(req, res) {
        try {
            //admin fetching all users, user fetching only yourself
            if (req.user.role === "admin") {
                const userList = await User.find();
                return res.status(200).json({
                    status: 200,
                    content: userList,
                    message: "Successfully users retrieved"
                });
            } else {
                const user = await User.findById(req.user._id);
                return res.status(200).json({
                    status: 200,
                    content: [{ ...user["_doc"], password: "" }],
                    message: "Successfully user retrieved"
                });
            }
        } catch (e) {
            res.status(401).json({ message: "Unauthorized" });
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
                res.status(201).json({
                    status: 201,
                    content: {
                        ...updatedUser["_doc"],
                        password: "Your password"
                    },
                    message: "Successfully updated"
                });
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
                    res.status(201).json({
                        status: 201,
                        content: updatedUser,
                        message: "Successfully updated"
                    });
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
