const { verifyToken, verifyTokenAndAdmin } = require('./verify');
const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Update isAdmin
router.put('/:id/setAsAdmin', verifyTokenAndAdmin, async (req, res) => {
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
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
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

module.exports = router;
