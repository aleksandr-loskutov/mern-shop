const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");
const productsMock = require("../mockData/products.json");
const categoriesMock = require("../mockData/categories.json");
const bcrypt = require("bcryptjs");
const config = require("config");
const chalk = require("chalk");
const getUrlFromString = require("../utils/getUrlFromString");
module.exports = async () => {
    if (!config.get("importMockData")) return;
    const categories = await Category.find();
    if (categories.length !== categoriesMock.length) {
        console.log(
            "Категории не соответствуют мок-данным и будут импортированы из них.."
        );
        await Category.collection.drop();
        const root = new Category({ name: "root" });
        const rootCategory = await root.save();
        const result = await createInitialCategoriesEntity(
            Category,
            categoriesMock,
            rootCategory
        );
        console.log(chalk.green.inverse(`Импорт категорий завершен`));
    }

    const products = await Product.find();
    if (products.length !== productsMock.length) {
        console.log(
            "Товары не соответствуют мок-данным и будут импортированы из них.."
        );
        await Product.collection.drop();
        const result = await createInitialProductsEntity(Product, productsMock);
        console.log(chalk.green.inverse(`Импорт товаров завершен`));
    }

    if (config.get("createAdminIfNotExist")) {
        const admin = await User.findOne({ role: "admin" });
        if (!admin) {
            const user = new User({
                email: config.get("admin").email,
                password: bcrypt.hashSync(
                    config.get("admin").password,
                    config.get("saltForPasswords")
                ),
                role: "admin"
            });
            await user.save();
            console.log(
                chalk.green.inverse(
                    `Создан новый админ согласно конфигу (/config/default.json): ${
                        config.get("admin").email
                    } с паролем  ${config.get("admin").password}`
                )
            );
        } else {
            await admin.updateOne({
                email: config.get("admin").email,
                password: bcrypt.hashSync(
                    config.get("admin").password,
                    config.get("saltForPasswords")
                )
            });
        }
    }
    if (
        products.length === productsMock.length &&
        categories.length === categoriesMock.length
    ) {
        console.log(chalk.green.inverse("Мок данные актуальны"));
    }
};

async function createInitialCategoriesEntity(Model, data, rootCategory) {
    return Promise.all(
        data.map(async (item) => {
            try {
                if (item.name === "root") return item;
                const newItem = new Model({
                    ...item,
                    _id: item._id["$oid"],
                    parentId: rootCategory,
                    urlAlias: getUrlFromString(item.urlAlias)
                });
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}

async function createInitialProductsEntity(Model, data) {
    return Promise.all(
        data.map(async (item) => {
            try {
                const categoryFound = await Category.findById(
                    item.categoryId["$oid"]
                );
                const brand = item.brand;
                const category = categoryFound
                    ? categoryFound._id
                    : await Category.findOne({ name: brand });
                const newItem = new Model({
                    ...item,
                    _id: item._id["$oid"],
                    categoryId: category?._id,
                    urlAlias: getUrlFromString(item.name)
                });
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}
