const User = require("../models/user");
class OrderController {
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
            if (req.user.role === "admin") {
                //admin can update anyone
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    req.body,
                    {
                        new: true
                    }
                );
                res.send(updatedUser);
            } else {
                //not admin can only update self data except role field
                if (
                    userId === req.user._id &&
                    !req.body.role &&
                    req.body.role !== ""
                ) {
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
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }
}
module.exports = new OrderController();
