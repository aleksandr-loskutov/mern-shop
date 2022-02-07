const { Schema, model, ObjectId } = require("mongoose");
const Token = new Schema(
    {
        user: { type: ObjectId, ref: "User" },
        refreshToken: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
module.exports = model("Token", Token);
