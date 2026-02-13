const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sanad_db';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Sanad Backend is Running with MongoDB!');
});

// Routes
const Donation = require('./models/Donation');
app.post('/api/donate', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.json({ message: 'Donation saved successfully' });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const stripeRoutes = require('./routes/stripe');
app.use('/api/stripe', stripeRoutes);

const storyRoutes = require('./routes/storyRoutes');
app.use('/api/stories', storyRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const memoryRoutes = require('./routes/memoryRoutes');
app.use('/api/memories', memoryRoutes);

const orphanRoutes = require('./routes/orphanRoutes');
app.use('/api/orphans', orphanRoutes);

const volunteerRoutes = require('./routes/volunteerRoutes');
app.use('/api/volunteers', volunteerRoutes);

const blacklistRoutes = require('./routes/blacklistRoutes');
app.use('/api/blacklist', blacklistRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

// Get all donations route for admin
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Only one app.listen()
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
