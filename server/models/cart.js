const { Schema, model, ObjectId } = require("mongoose");
const Product = require("./product");
const Cart = new Schema({
    userId: { type: ObjectId, required: true, ref: "User" },
    products: [{ type: ObjectId, ref: "Product" }],
    ordered: { type: Boolean, default: false }
});
module.exports = model("Cart", Cart);
