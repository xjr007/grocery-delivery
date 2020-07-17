const mongoose = require('mongoose');
const shortid = require('shortid');

const ProductSchema = mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	title: String,
	description: String,
	image: String,
	price: Number,
	category: String,
});

module.exports = mongoose.model('product', ProductSchema);
