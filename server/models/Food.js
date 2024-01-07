const { Schema, model } = require("mongoose");


const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
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