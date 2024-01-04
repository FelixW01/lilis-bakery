const express = require('express');
const router = express.Router();

// Define your API endpoints here
router.get('/food', (req, res) => {
    // Handle GET request for /api/food
    res.send(food);
});

router.post("/food", async (req, res) => {
	const newFood = new Food({
		name: req.body.name,
		price: req.body.price,

	});
	await newFood.save((err, food) => {
		if (err) {
			res.send(err);
		} else {
			res.send(food);
		}
	})	
});

router.get('/food/:id', (req, res) => {
    // Handle GET request for /api/food/:id
    const userId = req.params.id;
    res.send(`Get user with ID ${userId}`);
});

router.put('/food/:id', (req, res) => {
    // Handle PUT request for /api/food/:id
    const userId = req.params.id;
    res.send(`Update user with ID ${userId}`);
});

router.delete('/food/:id', (req, res) => {
    // Handle DELETE request for /api/food/:id
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
module.exports = router;