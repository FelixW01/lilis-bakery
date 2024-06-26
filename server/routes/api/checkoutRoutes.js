const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY)
const Cart = require('../../models/Cart');
const {createOrder} = require('../../controllers/orderController');
const auth = require("../../middleware/auth.js");

router.use("/", (req, res, next) => {
  req.userId = req.body.userId;
  next();
});

async function triggerUpdateCart(userId) {
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log('Cart not found');
            return;
        }

        cart.isPaid = true;
        await cart.save();

        console.log('Cart updated successfully:', cart);
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

function getBaseUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://lilisbakery-81b213953aed.herokuapp.com';
  } else {
    return 'http://127.0.0.1:5173';
  }
}

// Stripe Checkout
router.post("/", async (req, res) => {
    const { products, userId, subTotal } = req.body;
    console.log('Products: ', products);
    try {
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
            success_url: `${getBaseUrl()}/success`,
            cancel_url: `${getBaseUrl()}/cancel`,
        });

        res.json({ sessionId: session.id }); // Send session ID back to client
        // Trigger the router.put endpoint to update cart status to 'isPaid' after successful payment
        await triggerUpdateCart(userId);

    } catch (error) {
        console.error('Error during payment:', error);
        res.status(500).json({ error: 'Error during payment' });
    }
});

router.delete('/', auth, async (req, res) => {
  const userId = req.user.id;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Clear all items from the cart
      cart.items = [];
      cart.subTotal = 0;

      cart.isPaid = false;
      // Save the updated cart
      await cart.save();

      console.log('Cart deleted successfully:', cart);
    } else {
      console.log('Cart not found for userId:', userId);
    }
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw new Error('Error deleting cart');
  }
});

      
      
        
// Export the router
module.exports = router;