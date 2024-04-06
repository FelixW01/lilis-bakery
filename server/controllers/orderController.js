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

// Get Order
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

// Get Latest Order
const getLatestOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 }).limit(1);
    if (!latestOrder) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }
    res.status(200).json({ success: true, order: latestOrder });
  } catch (error) {
    console.error('Error getting latest order:', error);
    res.status(500).json({ success: false, error: 'Error getting latest order' });
  }
}

module.exports = {createOrder, getOrder, getLatestOrder};