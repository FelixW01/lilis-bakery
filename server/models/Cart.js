const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
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
    },
    });

const Cart = model("cart", cartSchema);

module.exports = Cart;