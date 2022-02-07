const { Schema, model, ObjectId } = require("mongoose");
const Product = require("./product");
const Cart = new Schema(
    {
        guestId: { type: ObjectId, ref: "Guest" },
        userId: { type: ObjectId, ref: "User" },
        products: [{ type: ObjectId, ref: "Product" }],
        ordered: { type: Boolean, default: false }
    },
    { timestamps: true }
);
module.exports = model("Cart", Cart);
