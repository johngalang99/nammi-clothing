const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('./verify');
const Cart = require('../models/Cart');

const router = require('express').Router();

// Create Cart
router.post('/create', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Cart
router.put('/:id/update', verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Cart
router.delete('/:id/delete', verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).json('Cart deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User Cart
router.get('/find/:userId', verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;