const Product = require("../models/product");
const Category = require("../models/category");
const productsMock = require("../mockData/products.json");
const categoriesMock = require("../mockData/categories.json");
module.exports = async () => {
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
        console.log(`Импорт категорий завершен`);
    }

    const products = await Product.find();
    if (products.length !== productsMock.length) {
        console.log(
            "Товары не соответствуют мок-данным и будут импортированы из них.."
        );
        await Product.collection.drop();
        const result = await createInitialProductsEntity(Product, productsMock);
        console.log(`Импорт товаров завершен`);
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
                    parentId: rootCategory
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
                const newItem = new Model({
                    ...item,
                    _id: item._id["$oid"],
                    categoryId: item.categoryId["$oid"]
                });
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}
