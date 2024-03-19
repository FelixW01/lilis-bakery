const Order = require('../models/Order');

// Create order
const createOrder = async (req, res) => {
  const { products, subTotal } = req.body;
  const userId = req.user.id;
  
  try {
    const order = new Order({
      userId,
      products,
      subTotal,
    });

    await order.save();

    res.status(201).json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Error creating order' });
  }
};

module.exports = {createOrder};