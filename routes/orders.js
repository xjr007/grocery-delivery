const express = require('express');
const router = express.Router();

// @route   GET api/orders
// @desc    Get all users orders
// @access  Private

router.get('/', (req, res) => {
	res.send('Get all orders');
});

// @route   POST api/orders
// @desc    Add new order
// @access  Private

router.post('/', (req, res) => {
	res.send('Add order');
});

// @route   PUT api/orders/:id
// @desc    Update order
// @access  Private

router.put('/:id', (req, res) => {
	res.send('Update order');
});

module.exports = router;
