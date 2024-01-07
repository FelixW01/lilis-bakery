const express = require('express');
const router = express.Router();
const Food = require("../../models/Food.js");

// Handle GET all request for /api/food
router.get('/', async (req, res) => {
    try {
        const food = await Food.find();
        res.send(food);
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle POST request for /api/food
router.post("/", async (req, res) => {
    try {
    const {name, price, count, weight, img, description, ingridients} = req.body;
	const newFood = await Food.create({
		name, // Required
        price, // Required
        count, // Required
        weight, // Required
        img,
        description,
        ingridients
	});	
    res.status(200).json(newFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle GET one by id request for /api/food/:id
router.get('/:id', async(req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        res.status(200).json(food)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle PUT request for /api/food/:id
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update user with ID ${userId}`);
});

// Handle DELETE request for /api/food/:id
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
module.exports = router;