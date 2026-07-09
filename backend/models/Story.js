// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String, // e.g. 'martyr', 'survivor'
  image: String,
  video: String,
  approved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Story", storySchema);
