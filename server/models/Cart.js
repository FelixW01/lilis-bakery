const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [{
        itemId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number,
        img: String
      }],
    subTotal: {
        type: Number,
        required: true,
        match: [/^[0-9]*\.[0-9]{2}$/, "Must be in dollar format!"],
        default: 0.00,
        orderby: Schema.Types.ObjectId,
        ref: "User"
    },
    },
    {
        timestamps: true,
    });

const Cart = model("cart", cartSchema);

module.exports = Cart;