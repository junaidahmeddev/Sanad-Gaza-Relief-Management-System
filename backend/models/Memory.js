// models/Memory.js
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["martyr", "survivor", "timeline"],
    required: true,
  },
  title: String,
  description: String,
  mediaUrl: String, // Image or Video URL
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Memory", memorySchema);
