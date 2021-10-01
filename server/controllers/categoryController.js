const Category = require("../models/category");
const { validationResult } = require("express-validator");
const cyrillicToTranslit = require("cyrillic-to-translit-js");
const Product = require("../models/product");

class CategoryController {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Ошибка при добавлении категории",
                    errors
                });
            }
            const { name, description, img, metaTitle, categoryId } = req.body;
            //TODO sanitize special chars in name before cyrToLat
            const alias = cyrillicToTranslit()
                .transform(name, "-")
                .toLowerCase();
            const checkForName = await Category.findOne({ name: name });
            if (checkForName) {
                return res.status(400).json({
                    message:
                        "Категория с таким наименованием / URL алиасом уже есть в базе"
                });
            }
            const category = new Category({
                name: name,
                description: description,
                categoryId: categoryId,
                metaTitle: metaTitle,
                img: img,
                urlAlias: alias
            });
            await category.save();
            return res.status(200).json({
                message: "Успешно добавлена категория",
                obj: category
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
    async update(req, res) {
        try {
        } catch (e) {}
    }
    async delete(req, res) {
        try {
        } catch (e) {}
    }
}
module.exports = new CategoryController();
