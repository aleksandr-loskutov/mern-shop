const { Schema, model, ObjectId } = require("mongoose");
const Product = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        images: { type: Array },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        featured: { type: Boolean },
        features: { type: Array },
        article: { type: String },
        manufacturerCode: { type: String },
        stock: { type: Number, default: 1 },
        brand: { type: String },
        urlAlias: { type: String, unique: true, required: true },
        status: { type: Boolean, default: true },
        categoryId: { type: ObjectId, ref: "Category" }
    },
    { timestamps: true }
);
module.exports = model("Product", Product);
