const Cart = require("../models/Cart.js");
const Food = require("../models/Food.js");

// Handle GET all request for /api/cart
const getCart = (async (req, res) => {
     const userId = req.query.userId
    try {
        const cart = await Cart.findOne({userId});
        if (cart && cart.items.length > 0) {
            res.status(200).json({ success: true, data: cart});
        } else {
            res.send({message: "Your Basket is empty"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

// Handle POST request for /api/cart
const addCart = async (req, res) => {
    const { itemId, quantity, userId } = req.body;

    // Convert quantity to a number
    const parsedQuantity = parseInt(quantity, 10);

    try {
        const cart = await Cart.findOne({ userId });
        const item = await Food.findOne({ _id: itemId });

        if (!item) {
            res.status(404).send({ message: 'Item not found' });
            return;
        }
        const price = item.price;
        const name = item.name;
        const img = item.img;

        // Check if cart already exists for user
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

            // Check if product exists in cart
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += parsedQuantity; 
                cart.subTotal = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).json({ success: true, data: cart });
            } else {
                cart.items.push({ itemId, name, quantity: parsedQuantity, price, img });
                cart.subTotal = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                await cart.save();
                res.status(200).json({ success: true, data: cart });
            }
        } else {
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ itemId, name, quantity: parsedQuantity, price }],
                subTotal: price * parsedQuantity,
            });
            res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Put route for updating cart quantity
const updateCartQuantity = async (req, res) => {
    
    const { itemId, newQuantity, userId } = req.body;

    // Convert newQuantity to a number
    const parsedNewQuantity = parseInt(newQuantity, 10);

    try {
        let cart = await Cart.findOne({ userId });

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];

            // Update the quantity
            item.quantity = parsedNewQuantity;

            // Update subtotal
            cart.subTotal = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0);

            // Save the updated cart
            cart = await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).send("Item not found in the cart");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Handle Delete request for /api/cart/ by user's id
const deleteCart = async (req, res) => {
    const { itemId, userId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                cart.subTotal -= item.quantity * item.price;

                if (cart.subTotal < 0) {
                    cart.subTotal = 0;
                }

                cart.items.splice(itemIndex, 1);

                // Recalculate subtotal
                cart.subTotal = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);

                // Save the updated cart
                cart = await cart.save();
                res.status(200).send(cart);
            } else {
                res.status(404).send("Item not found in the cart");
            }
        } else {
            res.status(404).send("Cart not found for the user");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};


// Export the router
module.exports = {getCart, addCart, deleteCart, updateCartQuantity};