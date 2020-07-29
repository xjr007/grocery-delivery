const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post(
	'/',
	[
		check('email', 'Enter a valid email').isEmail(),
		check('password', 'Enter a valid password').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid email/password' });
			}

			const authenticated = await bcrypt.compare(password, user.password);

			if (!authenticated) {
				return res.status(400).json({ msg: 'Invalid email/password' });
			}

			const payload = {
				user: {
					_id: user._id,
				},
			};

			token.sign(
				payload,
				config.get('SECRET_KEY'),
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
