const { Schema, model, ObjectId } = require("mongoose");
const Guest = new Schema({
    cartId: [{ type: ObjectId, ref: "Cart" }]
});
module.exports = model("Guest", Guest);
