const mongoose = require('mongoose');
const shortid = require('shortid');

const OrderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.String,
			ref: 'users',
		},
		_id: { type: String, default: shortid.generate },
		referenceNumber: {
			type: String,
			default: shortid.generate,
			unique: true,
			required: true,
		},

		deliveryType: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('order', OrderSchema);
