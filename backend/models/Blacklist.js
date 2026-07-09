// models/Blacklist.js
const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  name: String,
  reason: String,
  addedBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
