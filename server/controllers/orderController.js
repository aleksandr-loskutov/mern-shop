const Order = require("../models/order");
const Address = require("../models/address");
const { validationResult } = require("express-validator");
const Category = require("../models/category");
const Cart = require("../models/cart");
class OrderController {
    async create(req, res) {
        try {
            //TODO adds address to user if not exist, modify if exist
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Ошибка при добавлении заказа",
                    errors
                });
            }
            const { userId, cartId, comment } = req.body;
            // TODO расчет total
            let cart = await Cart.findOne({ _id: cartId });
            let products = await Cart.find({ _id: cart.products });

            // const { products } = cart;
            const sum = products.reduce(
                (acc, product) => acc + product.price,
                0
            );
            const order = new Order({
                userId: userId,
                cartId: cartId,
                total: sum,
                comment: comment
            });
            await order.save();
            //TODO сгенерировать новую корзину для пользователя
            return res.status(200).json({
                message: "Успешно добавлен заказ",
                obj: order
            });
        } catch (e) {}
    }
    async getAll(req, res) {
        try {
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Ошибка" });
        }
    }
    async getOne(req, res) {
        try {
        } catch (e) {}
    }
    async getByUser(req, res) {
        //user orders, check user id in token and compare it with request id
        try {
        } catch (e) {}
    }
}
module.exports = new OrderController();
