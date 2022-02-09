const { Schema, model, ObjectId } = require("mongoose");
const Order = new Schema(
    {
        userId: { type: ObjectId, ref: "User", required: true },
        products: { type: Array, required: true },
        total: { type: Number, required: true },
        payment: { type: Boolean, required: true, default: false },
        comment: { type: String }
    },
    { timestamps: true }
);
module.exports = model("Order", Order);
