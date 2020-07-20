const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/orders
// @desc    Get all users orders
// @access  Private

router.get('/', auth, async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id }).sort({ timestamps: -1 });
		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error loading orders');
	}
});

router.post('/', async (req, res) => {
	try {
		const newOrder = new Order(req.body);
		const saveOrder = await newOrder.save();
		res.send(saveOrder);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error saving order to db');
	}
});

module.exports = router;
