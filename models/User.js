const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = mongoose.Schema(
	{
		_id: { type: String, default: shortid.generate },
		name: {
			type: String,
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
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('user', UserSchema);
