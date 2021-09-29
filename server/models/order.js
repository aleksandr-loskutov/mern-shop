const { Schema, model, ObjectId } = require("mongoose");
const Order = new Schema({
    userId: { type: ObjectId, ref: "User", required: true },
    cartId: { type: ObjectId, ref: "Cart", required: true },
    payment: { type: Boolean, required: true, default: false },
    comment: { type: String }
});
module.exports = model("Order", Order);
