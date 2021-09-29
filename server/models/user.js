const { Schema, model, ObjectId } = require("mongoose");
const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: ObjectId, ref: "Address" },
    roles: [{ type: String, ref: "Role" }]
});
module.exports = model("User", User);
