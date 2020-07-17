const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = mongoose.Schema(
	{
		_id: { type: String, default: shortid.generate },
		name: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},

		cartItems: [
			{
				_id: String,
				title: String,
				price: Number,
				count: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('user', UserSchema);
