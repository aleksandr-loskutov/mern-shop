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
            let parentCat = categoryId;
            if (!parentCat || parentCat.isEmpty()) {
                let root = await Category.findOne({ name: "root" });

                if (!root) {
                    root = new Category({ name: "root" });
                    await root.save();
                }
                parentCat = root._id;
            }
            const category = new Category({
                name: name,
                description: description,
                parentId: parentCat,
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
            const categories = await Category.find({});
            return res.status(200).json(categories);
        } catch (e) {}
    }
    async getOne(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            return category
                ? res.status(200).json(category)
                : res.status(404).json({ message: "Категория не найдена" });
        } catch (e) {}
    }
    async update(req, res) {
        try {
            const category = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(category);
        } catch (e) {}
    }
    async delete(req, res) {
        try {
            await Category.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Категория была удалена" });
        } catch (e) {}
    }
}
module.exports = new CategoryController();
