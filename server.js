const express = require('express');
const conn = require('./config/db');
const path = require('path');

const app = express();

// db connected
conn();

// Mmiddleware
app.use(express.json({ extend: false }));

/* Routes */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('./client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
