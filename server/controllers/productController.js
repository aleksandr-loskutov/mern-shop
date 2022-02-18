const Product = require("../models/product");
const Category = require("../models/category");
const { validationResult } = require("express-validator");
const { json } = require("express");
const getUrlFormString = require("../utils/getUrlFromString");
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
            } else {
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
                    features,
                    status,
                    featured
                } = req.body;
                const alias = getUrlFormString(name);
                const checkForName = await Product.findOne({ name: name });
                const checkForAlias = await Product.findOne({
                    urlAlias: alias
                });
                if (checkForName || checkForAlias) {
                    return res.status(400).json({
                        status: 400,
                        message:
                            "Товар с таким наименованием или url уже есть в базе",
                        errors
                    });
                }
                //getting category name as brand for filtering purposes at the catalog
                const category = await Category.findById(categoryId);
                const product = new Product({
                    name,
                    description,
                    features: JSON.parse(features),
                    images: [
                        req.file ? "/images/uploads/" + req.file.filename : ""
                    ],
                    urlAlias: alias,
                    discount: discount ? discount : 0,
                    stock,
                    brand: category.name,
                    categoryId,
                    price,
                    featured,
                    status,
                    manufacturerCode,
                    article
                });
                await product.save();
                return res.status(201).json({
                    message: "Успешно добавлен",
                    status: 201,
                    content: product
                });
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
    async getAll(req, res) {
        try {
            const products = await Product.find({});
            return res.status(200).json({
                message: "Получены товары",
                status: 200,
                content: products
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при добавлении товара",
                    errors
                });
            } else {
                const { discount, categoryId, features, images, name } =
                    req.body;
                const productId = req.params.id;
                const dbProduct = await Product.findById(productId);
                let alias = getUrlFormString(name);
                if (dbProduct.name !== name && dbProduct.urlAlias !== alias) {
                    const checkForAlias = await Product.findOne({
                        urlAlias: alias
                    });
                    if (checkForAlias) {
                        return res.status(400).json({
                            status: 400,
                            message:
                                "Товар с таким наименованием или url уже есть в базе"
                        });
                    }
                }
                //getting category name as brand for filtering purposes at the catalog.
                const category = await Category.findById(categoryId);

                const oldImages =
                    images.split(",").length > 0 ? images.split(",") : images;
                const editedData = {
                    ...req.body,
                    brand: category.name,
                    urlAlias: alias,
                    discount: discount ? discount : 0,
                    features: JSON.parse(features),
                    images: req.file
                        ? [
                              req.file
                                  ? "/images/uploads/" + req.file.filename
                                  : ""
                          ]
                        : Array.isArray(oldImages)
                        ? oldImages
                        : [oldImages]
                };
                const product = await Product.findOneAndUpdate(
                    { _id: productId },
                    {
                        $set: editedData
                    },
                    { new: true }
                );
                res.status(200).json({
                    message: "Успешно",
                    content: product,
                    status: 200
                });
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
    async delete(req, res) {
        try {
            await Product.deleteOne({ _id: req.params.id });
            //TODO проверка на удаление
            res.status(200).json({
                status: 200,
                message: "Продукт был удален"
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
}

module.exports = new ProductController();
