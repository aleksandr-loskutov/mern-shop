const Product = require("../models/product");
const Category = require("../models/category");
const { validationResult } = require("express-validator");
const { sanitize } = require("string-sanitizer");
const cyrillicToTranslit = require("cyrillic-to-translit-js");
const { json } = require("express");
const { log } = require("nodemon/lib/utils");

class ProductController {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при добавлении товара",
                    errors
                });
            }

            const {
                name,
                description,
                price,
                discount,
                stock,
                brand,
                article,
                categoryId,
                manufacturerCode,
                file,
                features,
                status,
                featured
            } = req.body;
            const alias = sanitize(
                cyrillicToTranslit().transform(name, "-").toLowerCase()
            );
            const checkForName = await Product.findOne({ name: name });
            if (checkForName) {
                return res.status(400).json({
                    status: 400,
                    message: "Товар с таким наименованием уже есть в базе",
                    errors
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
                images: [file ? file.path : ""],
                discount: discount,
                stock: stock,
                brand: brand,
                categoryId: category,
                price: price,
                urlAlias: alias,
                featured: featured,
                status: status,
                manufacturerCode: manufacturerCode,
                article: article
            });
            await product.save();
            return res.status(201).json({
                message: "Успешно добавлен",
                status: 201,
                content: product
            });
        } catch (e) {}
    }
    async getAll(req, res) {
        try {
            const products = await Product.find({});
            return res.status(200).json({
                message: "Получены товары",
                status: 200,
                content: products
            });
        } catch (e) {}
    }
    async getOne(req, res) {
        try {
            const isId =
                req.params.id.length === 24 && !req.params.id.includes("-");
            const product = isId
                ? await Product.findById(req.params.id)
                : await Product.find({
                      urlAlias: req.params.id
                  });
            return product
                ? res.status(200).json({
                      message: "Успешно",
                      content: product,
                      status: 200
                  })
                : res
                      .status(404)
                      .json({ message: "Продукт не найден", status: 400 });
        } catch (e) {}
    }
    async getByCategory(req, res) {
        try {
            const products = await Product.find({
                categoryId: req.params.categoryId
            });
            return products
                ? res.status(200).json({
                      message: "Успешно",
                      content: products,
                      status: 200
                  })
                : res.status(404).json({ message: "Не найдено", status: 400 });
        } catch (e) {}
    }
    async update(req, res) {
        try {
            const product = await Product.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json({
                message: "Успешно",
                content: product,
                status: 200
            });
        } catch (e) {}
    }
    async delete(req, res) {
        try {
            await Product.deleteOne({ _id: req.params.id });
            //TODO проверка на удаление
            res.status(200).json({ message: "Продукт был удален" });
        } catch (e) {}
    }
}
module.exports = new ProductController();
