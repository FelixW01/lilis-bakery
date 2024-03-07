const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY)
const Cart = require('../../models/Cart');

// Stripe Checkout
router.post("/", async(req, res) => {
    const { products, userId } = req.body;
    console.log('Products: ', products);

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                images: ['https://i.imgur.com/ms5gRpW.png']
            },
            unit_amount: Math.round(product.price * 100)
        },
        quantity: product.quantity
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://127.0.0.1:5173/success',
        cancel_url: 'http://127.0.0.1:5173/cancel',
    })

    res.json({id: session.id})
    await deleteCart(userId);
});

const deleteCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Clear all items from the cart
      cart.items = [];
      cart.subTotal = 0;

      // Save the updated cart
      await cart.save();
    }
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw new Error('Error deleting cart');
  }
};

// Export the router
module.exports = router;