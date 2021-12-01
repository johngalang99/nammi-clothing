const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('./verify');
const Order = require('../models/Order');
const router = require('express').Router();

// Create Order
router.post('/create', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Order
router.put('/:id/update', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Order
router.delete('/:id/delete', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json('Order deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User Order
router.get('/find/:userId', verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Orders
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
