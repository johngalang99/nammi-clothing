const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        title: {
          type: String,
        },
        img: {
          type: String,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
