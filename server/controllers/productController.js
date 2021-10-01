const Product = require("../models/product");
const Category = require("../models/category");
const { validationResult } = require("express-validator");
const cyrillicToTranslit = require("cyrillic-to-translit-js");
const { json } = require("express");

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
                categoryId: categoryId,
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
            const products = await Product.find({
                categoryId: req.params.categoryId
            });
            res.status(200).json(products);
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
module.exports = new ProductController();
