const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verify');
const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Update isAdmin (Admin only)
router.put('/:id/setAsAdmin', verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update User (Admin Only)
router.put('/:id/update', verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete User (Auth only)
router.delete('/:id/delete', verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User(Auth only)
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Users (Admin only)
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
