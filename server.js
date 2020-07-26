const express = require('express');
const conn = require('./config/db');

const app = express();

// db connected
conn();

// Mmiddleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.json({ message: 'Account API' }));

/* Routes */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
