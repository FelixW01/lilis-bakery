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
    count: {
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    ingridients: {
        type: String,
    },
    }
);


const Food = model("food", foodSchema);

module.exports = Food;