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

router.post(
	'/',
	[auth, [check('deliveryType', 'Delivery priority required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { _id, referenceNumber, deliveryType, cartOrder } = req.body;
		try {
			const newOrder = new Order({
				_id,
				referenceNumber,
				deliveryType,
				cartOrder,
				user: req.user._id,
			});

			const saveOrder = await newOrder.save();
			res.json(saveOrder);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Error saving order to db');
		}
	}
);

router.delete('/:id', auth, async (req, res) => {
	try {
		let order = await Order.findById(req.params.id);

		if (!order) return res.status(404).json({ msg: 'Order does not exist' });

		// Make sure user owns contact
		if (order.user.toString() !== req.user._id) {
			return res.status(401).json({ msg: 'Not authorised' });
		}

		await Order.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Order removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
