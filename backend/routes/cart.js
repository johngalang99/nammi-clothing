const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin,
} = require('./verify');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = require('express').Router();

// add to cart/update cart
router.post('/add/:id', verifyTokenAndAuth, async (req, res) => {
    const { userId, productId, color, size, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: userId });
        let product = await Product.findById({ _id: productId });
        if (!product) {
            return `no product`;
        }
        const price = product.price;
        const title = product.title;
        const img = product.img;

        if (cart) {
            let productIndex = cart.products.findIndex(
                (p) => p.productId == req.body.productId
            );

            if (productIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[productIndex];
                productItem.quantity += quantity;
                cart.totalAmount += quantity * price;
            } else {
                //product does not exists in cart, add new item
                cart.products.push({
                    productId,
                    quantity,
                    title,
                    img,
                    price,
                    color,
                    size,
                });
                cart.totalAmount += quantity * price;
            }
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId: userId,
                products: [
                    { productId, title, color, size, price, img, quantity },
                ],
                totalAmount: quantity * price,
            });
            res.status(200).json(newCart);
        }
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
router.get('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
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
