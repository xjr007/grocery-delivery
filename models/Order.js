const mongoose = require('mongoose');
const shortid = require('shortid');

const OrderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.String,
			ref: 'users',
		},
		_id: { type: String, default: shortid.generate },
		name: {
			type: String,
		},

		referenceNumber: {
			type: String,
			default: shortid.generate,
			unique: true,
		},

		deliveryType: {
			type: String,
			default: 'Normal',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('order', OrderSchema);
