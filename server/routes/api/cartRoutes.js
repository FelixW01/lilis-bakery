const express = require('express');
const router = express.Router();
const Cart = require("../../models/Cart.js");
const Food = require("../../models/Food.js");
const auth = require("../../middleware/auth.js");


// Handle GET all request for /api/cart
router.get('/', async (req, res) => {
    const user = req.user._id;
    try {
        const cart = await Cart.findOne({user});
        if (cart && cart.items.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send({message: "Your Basket is empty"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle POST request for /api/cart
router.post("/", auth, async (req, res) => {
    const user = req.user._id;
    const {itemId, quantity} = req.body;
    try {
	const cart = await Cart.findOne({user});
    const item = await Food.findOne({_id: itemId});

    if (!item) {
        res.status(404).send({message: 'Item not found'});  
        return;
    }
    const price = item.price;
    const name = item.name;
    // Check if cart already exists for user
    if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    // Check if product exists in cart
    if (itemIndex > -1) {
        let product = cart.items[itemIndex];
        product.quantity += quantity;
        cart.subTotal = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        }, 0)
        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
    } else {
        cart.items.push({itemId, name, quantity, price});
        cart.subTotal = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        }, 0)
        await cart.save();
        res.status(200).send(cart);
    }
    } else {
        //no cart exists, create one
        const newCart = await Cart.create({
            user,
            items: [{ itemId, name, quantity, price}],
            subTotal: price * quantity
        });
        res.status(201).json(newCart);
    }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle Delete request for /api/cart/ by user's id
router.delete('/', auth, async (req, res) => {
    const user = req.user._id;
    const itemId = req.body.itemId;
    try {
        let cart = await Cart.findOne({user})

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.subTotal -= item.quantity * item.price;
            if(cart.subTotal < 0) {
                cart.subTotal = 0
            }
            cart.items.splice(itemIndex, 1);
            cart.subTotal = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;98
            }, 0)
            cart = await cart.save();
            res.status(200).send(cart); 
        } else {    
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send();
} 
})

// Export the router
module.exports = router;