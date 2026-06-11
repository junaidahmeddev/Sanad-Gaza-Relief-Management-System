const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sanad_db';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Sanad Backend is Running Live!');
});

// Routes
app.post('/api/donate', async (req, res) => {
  const Donation = require('./models/Donation');
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.json({ message: 'Donation saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/memories', require('./routes/memoryRoutes'));
app.use('/api/orphans', require('./routes/orphanRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/blacklist', require('./routes/blacklistRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is live on port ${PORT}`);
});