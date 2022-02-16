const { Schema, model, ObjectId } = require("mongoose");
const Category = new Schema(
    {
        name: { type: String, required: true },
        parentId: {
            type: ObjectId,
            ref: "Category"
        },
        description: { type: String },
        img: { type: String },
        metaTitle: { type: String },
        urlAlias: { type: String },
        status: { type: Boolean, default: true }
    },
    { timestamps: true }
);
module.exports = model("Category", Category);
