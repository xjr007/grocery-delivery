const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc   Get logged in user
// @access  Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/auth
// @desc   Auth user & get token
// @access  Public

router.post(
	'/',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Password required').exists(),
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
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			const authenticated = await bcrypt.compare(password, user.password);

			if (!authenticated) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			const payload = {
				user: {
					_id: user._id,
				},
			};

			// Change expire to 3600

			token.sign(
				payload,
				config.get('SECRET_KEY'),
				{
					expiresIn: 36000,
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
