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
                    status: 400,
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
                    status: 400,
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
                status: 200,
                message: "Успешно добавлена категория",
                content: category
            });
        } catch (e) {}
    }
    async getAll(req, res) {
        try {
            const categories = await Category.find({ name: { $ne: "root" } });
            // console.log("request for getAll categories");
            return res.status(200).json({
                status: 200,
                content: categories,
                message: "Successfully categories retrieved"
            });
        } catch (e) {}
    }
    async getOne(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            return category
                ? res.status(200).json({
                      status: 200,
                      content: category,
                      message: "Successfully category retrieved"
                  })
                : res
                      .status(404)
                      .json({ status: 404, message: "Категория не найдена" });
        } catch (e) {}
    }
    async update(req, res) {
        try {
            const category = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json({
                status: 200,
                content: category,
                message: "Successfully category updated"
            });
        } catch (e) {}
    }
    async delete(req, res) {
        try {
            await Category.deleteOne({ _id: req.params.id });
            res.status(200).json({
                status: 200,
                message: "Категория была удалена"
            });
        } catch (e) {}
    }
}
module.exports = new CategoryController();
