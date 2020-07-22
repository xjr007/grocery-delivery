const token = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const authToken = req.header('x-auth-token');

	if (!authToken) {
		return res.status(401).json({ msg: 'Authorisation denied' });
	}

	try {
		const decoded = token.verify(authToken, config.get('SECRET_KEY'));

		req.user = decoded.user;
		next();
	} catch (err) {
		console.error(err.message);
		res.status(401).json({ msg: 'Authorisation denied. Token not valid' });
	}
};
