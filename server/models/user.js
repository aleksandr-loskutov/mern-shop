const { Schema, model, ObjectId } = require("mongoose");
const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, default: "" },
        lastName: { type: String, default: "" },
        phone: { type: String, default: "" },
        city: { type: String, default: "" },
        address: { type: String, default: "" },
        postCode: { type: String, default: "" },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        }
    },
    { timestamps: true }
);
module.exports = model("User", User);
