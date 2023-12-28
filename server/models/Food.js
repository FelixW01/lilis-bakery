const { Schema, model } = require("mongoose");


const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        match: [/^[0-9]*\.[0-9]{2}$/, "Must be in dollar format!"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});


const Food = model("food", foodSchema);

module.exports = Food;