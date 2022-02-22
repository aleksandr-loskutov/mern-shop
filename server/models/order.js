const { Schema, model, ObjectId } = require("mongoose");
const Order = new Schema(
    {
        userId: { type: ObjectId, ref: "User", required: true },
        deliveryMethod: { type: String, required: true },
        orderNumber: { type: Number, required: true },
        receiver: { type: Object, required: true },
        products: { type: Array, required: true },
        total: { type: Number, required: true },
        paymentType: {
            type: String,
            enum: ["card", "onDelivery"],
            default: "card"
        },
        payment: { type: Boolean, required: true, default: false },
        status: {
            type: String,
            enum: ["notPayed", "payed", "shipped"],
            default: "не оплачен"
        }
    },
    { timestamps: true }
);
module.exports = model("Order", Order);
