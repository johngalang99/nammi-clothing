const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('./verify');
const Order = require('../models/Order');
const router = require('express').Router();
const Cart = require('../models/Cart');

// Checkout Order
router.post('/:id/checkout', verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      const { userId, products, totalAmount } = cart;
      const newOrder = await Order.create({
        userId: userId,
        products: products,
        totalAmount: totalAmount,
      });
      await Cart.findByIdAndDelete({ _id: cart._id });
      res.status(200).json(newOrder);
    } else {
      return `no products in cart`;
    }
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
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ id: req.params.id });
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
