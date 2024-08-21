// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { products, totalPrice } = req.body;
        const order = new Order({ user: user._id, products, totalPrice });
        await order.save();

        user.orderHistory.push(order._id);
        await user.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
