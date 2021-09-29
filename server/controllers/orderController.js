const Order = require("../models/order");
const Address = require("../models/address");
class OrderController {
    async create(req, res) {
        try {
            //adds address to user if not exist, modify if exist
            //adds order
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
