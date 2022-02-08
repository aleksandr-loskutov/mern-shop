const { Schema, model, ObjectId } = require("mongoose");
const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: ObjectId, ref: "Address" },
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
