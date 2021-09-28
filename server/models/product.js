const { Schema, model } = require("mongoose");
const Product = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    img: { type: String },
    price: { type: Number, required: true },
    sale: { type: Boolean, default: false },
    discount: { type: Number },
    stock: { type: Number },
    rating: { type: Number },
    color: { type: String, ref: "Color" },
    brand: { type: String, ref: "Brand" }
});
module.exports = model("Product", Product);
