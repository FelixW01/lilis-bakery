const express = require('express');
const router = express.Router();

// Define your API endpoints here
router.get('/users', (req, res) => {
    // Handle GET request for /api/users
    res.send('Get all users');
});

router.post('/users', (req, res) => {
    // Handle POST request for /api/users
    res.send('Create a new user');
});

router.get('/users/:id', (req, res) => {
    // Handle GET request for /api/users/:id
    const userId = req.params.id;
    res.send(`Get user with ID ${userId}`);
});

router.put('/users/:id', (req, res) => {
    // Handle PUT request for /api/users/:id
    const userId = req.params.id;
    res.send(`Update user with ID ${userId}`);
});

router.delete('/users/:id', (req, res) => {
    // Handle DELETE request for /api/users/:id
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
module.exports = router;