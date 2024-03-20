const Order = require('../models/Order');

// Create order
const createOrder = async (req, res) => {
  const { items, subTotal } = req.body;
  const userId = req.user.id;
  
  try {
    const order = new Order({
      userId,
      items,
      subTotal,
    });

    await order.save();

    res.status(201).json({ success: true, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Error creating order' });
  }
};

const getOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await Order.find({ userId });
    res.status(200).json(order);
  }
  catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ success: false, error: 'Error getting order' });
  }
}

module.exports = {createOrder, getOrder};