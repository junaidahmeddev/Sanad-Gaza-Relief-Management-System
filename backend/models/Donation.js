const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor_name: String,
  amount: Number,
  type: String, // e.g., money or items
  item_description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
