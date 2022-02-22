const Order = require("../models/order");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const User = require("../models/user");
class OrderController {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при добавлении заказа",
                    errors
                });
            }
            const { products } = req.body;
            //find products by ids to trust further
            const dbProductsForOrder = await Product.find()
                .where("_id")
                .in(
                    products.reduce((acc, product) => {
                        acc.push(product._id);
                        return acc;
                    }, [])
                )
                .exec();
            if (!dbProductsForOrder || dbProductsForOrder.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при добавлении заказа",
                    errors
                });
            }
            //return back cartQuantity from user products array
            const orderedProducts = dbProductsForOrder.map((product) => {
                const index = products.findIndex((p) =>
                    product._id.equals(p._id)
                );
                return {
                    ...product["_doc"],
                    cartQuantity: products[index].cartQuantity
                };
            });

            const extraPrice = req.body.extraPrice || 0;
            const total =
                orderedProducts.reduce(
                    (acc, product) =>
                        acc + product.price * product.cartQuantity,
                    0
                ) + extraPrice;

            const userId = req.user._id;
            const receiver = {
                name: req.body.name,
                lastName: req.body.lastName,
                phone: req.body.phone,
                city: req.body.city,
                address: req.body.address,
                postCode: req.body.postCode
            };
            const updatedUserReceiver = await User.findByIdAndUpdate(userId, {
                ...receiver
            });
            const order = new Order({
                userId: userId,
                orderNumber: Date.now(),
                deliveryMethod: req.body.deliveryMethod,
                receiver,
                products: orderedProducts,
                total,
                paymentType: req.body.paymentType,
                payment: req.body.paymentType === "card",
                status: req.body.paymentType === "card" ? "payed" : "notPayed"
            });
            await order.save();
            return res.status(200).json({
                status: 200,
                message: "Успешно добавлен заказ",
                content: order
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже."
            });
        }
    }
    async get(req, res) {
        try {
            //admin fetching all orders, user fetching only his own
            if (req.user.role === "admin") {
                const orders = await Order.find();
                return res.status(200).json({
                    status: 200,
                    content: orders,
                    message: "Successfully orders retrieved"
                });
            } else {
                const userOrders = await Order.find({ userId: req.user._id });
                return res.status(200).json({
                    status: 200,
                    content: userOrders,
                    message: "Successfully user orders retrieved"
                });
            }
        } catch (e) {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    async update(req, res) {
        try {
            const { orderId } = req.params;
            if (!orderId) {
                res.status(401).json({
                    message: "Specify orderNumber to update"
                });
            }
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                req.body,
                {
                    new: true
                }
            );

            res.status(201).json({
                status: 201,
                content: {
                    ...updatedOrder["_doc"]
                },
                message: "Successfully updated"
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
}

module.exports = new OrderController();

//not used
// function randomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }
//
// async getOne(req, res) {
//     try {
//         const order = await Order.findById(req.params.id);
//         return order
//             ? res.status(200).json({
//                 status: 200,
//                 content: order,
//                 message: "Successfully order retrieved"
//             })
//             : res
//                 .status(404)
//                 .json({ status: 404, message: "order not found" });
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере возникла ошибка. Попробуйте позже."
//         });
//     }
// }
// async getByUser(req, res) {
//     //user orders, check user id in token and compare it with request id
//     try {
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере возникла ошибка. Попробуйте позже."
//         });
//     }
// }
