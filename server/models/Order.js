const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    items: [
        {
        type: Schema.Types.ObjectId,
        ref: "Food",
        },
    ],
    subTotal: {
        type: Number,
        match: [/^[0-9]*\.[0-9]{2}$/, "Must be in dollar format!"],
        default: 0.00,
        orderby: Schema.Types.ObjectId,
        ref: "User"
    },
    });

const Order = model("order", orderSchema);

module.exports = Order;