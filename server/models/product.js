const { Schema, model, ObjectId } = require("mongoose");
const Product = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: Array },
    price: { type: Number, required: true },
    sale: { type: Boolean, default: false },
    discount: { type: Number },
    stock: { type: Number, default: 1 },
    rating: { type: Number },
    color: { type: String, ref: "Color" },
    brand: { type: String, ref: "Brand" },
    metaTitle: { type: String },
    urlAlias: { type: String, unique: true, required: true },
    categoryId: { type: ObjectId, ref: "Category" }
});
module.exports = model("Product", Product);
