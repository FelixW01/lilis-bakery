const express = require('express');
const router = express.Router();
const {getCart, addCart, deleteCart, updateCartQuantity} = require("../../controllers/cartController.js");
const auth = require("../../middleware/auth.js");

// Assign auth middleware to all /cart routes
router.use(auth)

// Get cart info
router.get("/", getCart);

// Add item to cart
router.post("/", addCart);

// Delete item from cart
router.delete("/", deleteCart);

// Update item quantity in cart
router.put("/", updateCartQuantity);

// Export the router
module.exports = router;