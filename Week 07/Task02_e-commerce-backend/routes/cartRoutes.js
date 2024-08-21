// routes/cartRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

let cart = []; // Simple in-memory cart for demonstration

// Add product to cart
router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    res.json(cart);
});

// View cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Remove item from cart
router.delete('/remove/:id', (req, res) => {
    cart = cart.filter(item => item.productId !== req.params.id);
    res.json(cart);
});

module.exports = router;
