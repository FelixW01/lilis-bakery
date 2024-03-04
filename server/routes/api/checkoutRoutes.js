const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY)

// Stripe Checkout
router.post("/checkout", async(req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                images: [product.image]
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
});


// Export the router
module.exports = router;