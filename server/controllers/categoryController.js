const Category = require("../models/category");

class CategoryController {
    async create(req, res) {
        try {
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
}
module.exports = new CategoryController();
