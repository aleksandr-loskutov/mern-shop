const { Schema, model, ObjectId } = require("mongoose");
const Address = new Schema(
    {
        userId: { type: ObjectId, ref: "User", required: true },
        receiverName: { type: String },
        receiverLastName: { type: String },
        phone: { type: String },
        city: { type: String },
        street: { type: String },
        building: { type: String },
        officeOrApartment: { type: String }
    },
    { timestamps: true }
);
module.exports = model("Address", Address);
