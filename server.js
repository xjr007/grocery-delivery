const express = require('express');
const conn = require('./config/db');

const app = express();

// Connect db
conn();

// Initialize middleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.json({ message: 'Account API' }));

/* Routes */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
