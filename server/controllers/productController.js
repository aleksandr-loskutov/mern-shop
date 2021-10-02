const Product = require("../models/product");
const Category = require("../models/category");
const { validationResult } = require("express-validator");
const cyrillicToTranslit = require("cyrillic-to-translit-js");
const { json } = require("express");
const { log } = require("nodemon/lib/utils");

class ProductController {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при добавлении товара", errors });
            }

            const {
                name,
                description,
                img,
                price,
                sale,
                discount,
                stock,
                rating,
                color,
                brand,
                metaTitle,
                categoryId
            } = req.body;
            //TODO sanitize special chars in name before cyrToLat
            const alias = cyrillicToTranslit()
                .transform(name, "-")
                .toLowerCase();
            const checkForName = await Product.findOne({ name: name });
            if (checkForName) {
                return res.status(400).json({
                    message: "Товар с таким наименованием уже есть в базе"
                });
            }
            let category = categoryId;
            if (!category || category.isEmpty()) {
                let root = await Category.findOne({ name: "root" });
                if (!root) {
                    root = new Category({ name: "root" });
                    await root.save();
                }
                category = root._id;
            }
            // console.log(category);
            const product = new Product({
                name: name,
                description: description,
                img: img,
                sale: sale,
                discount: discount,
                stock: stock,
                rating: rating,
                color: color,
                brand: brand,
                metaTitle: metaTitle,
                categoryId: category,
                price: price,
                urlAlias: alias
            });
            await product.save();
            return res.status(200).json({
                message: " Успешно добавлен товар",
                obj: product
            });
        } catch (e) {}
    }
    async getAll(req, res) {
        try {
            const products = await Product.find({});
            return res.status(200).json(products);
        } catch (e) {}
    }
    async getOne(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            return product
                ? res.status(200).json(product)
                : res.status(404).json({ message: "Продукт не найден" });
        } catch (e) {}
    }
    async getByCategory(req, res) {
        try {
            const products = await Product.find({
                categoryId: req.params.categoryId
            });
            return res.status(200).json(products);
        } catch (e) {}
    }
    async update(req, res) {
        try {
            const product = await Product.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(product);
        } catch (e) {}
    }
    async delete(req, res) {
        try {
            await Product.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Продукт был удален" });
        } catch (e) {}
    }
}
module.exports = new ProductController();
