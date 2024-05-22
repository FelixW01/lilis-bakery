const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    guest: {
        email: String,
        name: String,
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
    isPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    },
    {
        timestamps: true,
    });

const Cart = model("cart", cartSchema);

module.exports = Cart;