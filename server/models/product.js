const { Schema, model, ObjectId } = require("mongoose");
const Product = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    img: { type: String },
    price: { type: Number, required: true },
    sale: { type: Boolean, default: false },
    discount: { type: Number },
    stock: { type: Number, default: 1 },
    rating: { type: Number },
    color: { type: String, ref: "Color" },
    brand: { type: String, ref: "Brand" },
    metaTitle: { type: String },
    urlAlias: { type: String },
    categoryId: { type: ObjectId, ref: "Category" }
});
module.exports = model("Product", Product);
