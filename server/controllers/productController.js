const Product = require("../models/product");
const Category = require("../models/category");

class ProductController {
    async create(req, res) {
        try {
            // console.log("create", req.body);
            // return res.json({
            //     message: "Товар добавлен!"
            // });
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
    async getByCategory(req, res) {
        try {
        } catch (e) {}
    }
}
module.exports = new ProductController();
