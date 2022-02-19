const Category = require("../models/category");
const { validationResult } = require("express-validator");
const { json } = require("express");
const getUrlFormString = require("../utils/getUrlFromString");
//
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
            } else {
                const { name } = req.body;
                const alias = getUrlFormString(name);
                const checkForName = await Category.findOne({ name: name });
                const checkForAlias = await Category.findOne({
                    urlAlias: alias
                });
                const root = await Category.findOne({ name: "root" });
                const parentId = root._id;
                if (checkForName || checkForAlias) {
                    return res.status(400).json({
                        status: 400,
                        message:
                            "Категория с таким наименованием или url уже есть в базе",
                        errors
                    });
                }
                const category = new Category({
                    ...req.body,
                    parentId,
                    img: req.file
                        ? "/images/uploads/" + req.file.filename
                        : "/images/products/placeholder.png",
                    urlAlias: alias
                });
                await category.save();
                return res.status(201).json({
                    message: "Успешно добавлена категория",
                    status: 201,
                    content: category
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
            const categories = await Category.find({ name: { $ne: "root" } });
            return res.status(200).json({
                message: "Получены категории",
                status: 200,
                content: categories
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
                    message: "Ошибка при добавлении категории",
                    errors
                });
            } else {
                const { name } = req.body;
                const categoryId = req.params.id;
                const dbCategory = await Category.findById(categoryId);
                let alias = getUrlFormString(name);
                if (dbCategory.name !== name && dbCategory.urlAlias !== alias) {
                    const checkForAlias = await Category.findOne({
                        urlAlias: alias
                    });
                    if (checkForAlias) {
                        return res.status(400).json({
                            status: 400,
                            message:
                                "Категория с таким наименованием или url уже есть в базе"
                        });
                    }
                }

                const editedData = {
                    ...req.body,
                    urlAlias: alias,
                    img: req.file
                        ? "/images/uploads/" + req.file.filename
                        : dbCategory.img !== ""
                        ? dbCategory.img
                        : "/images/products/placeholder.png"
                };
                // console.log("editedData", editedData);
                const category = await Category.findOneAndUpdate(
                    { _id: categoryId },
                    {
                        $set: editedData
                    },
                    { new: true }
                );
                res.status(200).json({
                    message: "Успешно",
                    content: category,
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
            await Category.deleteOne({ _id: req.params.id });
            res.status(200).json({
                status: 200,
                message: "Категория была удален"
            });
        } catch (e) {
            res.status(500).json({
                message: "На сервере возникла ошибка. Попробуйте позже.",
                error: e.message
            });
        }
    }
}

module.exports = new CategoryController();
