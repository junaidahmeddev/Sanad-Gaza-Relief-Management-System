const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SECRET_KEY) {
    return res.status(500).json({ error: 'Server authentication configuration is incomplete' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
