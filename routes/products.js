const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @route   GET api/orders
// @desc    Get all users orders
// @access  Private

router.get('/', async (req, res) => {
	try {
		const products = await Product.find({});
		res.send(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error loading products');
	}
});

router.post('/', async (req, res) => {
	try {
		const newProduct = new Product(req.body);
		const saveProduct = await newProduct.save();
		res.send(saveProduct);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error saving product to db');
	}
});

module.exports = router;
