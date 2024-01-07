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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findByIdAndUpdate(foodId, req.body);
        const updatedFood = await Food.findById(foodId);
        // Food wasn't found in DB
        
        if (!food) {res.status(404).send('Food not found')}
        else {
            res.status(200).json(updatedFood);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle DELETE request for /api/food/:id
router.delete('/:id', async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findByIdAndDelete(foodId);
        if (!food) {res.status(404).send('Food not found')}
        else {
            res.status(200).json({message: `Food with ID ${foodId} was deleted`});
        }        
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Export the router
module.exports = router;