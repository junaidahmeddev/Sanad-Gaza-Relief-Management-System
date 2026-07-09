// models/Orphan.js
const mongoose = require('mongoose');

const orphanSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  guardian: String,
  needs: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orphan', orphanSchema);
