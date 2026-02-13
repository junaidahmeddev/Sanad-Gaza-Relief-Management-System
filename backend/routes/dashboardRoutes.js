// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Story = require('../models/Story');
const Memory = require('../models/Memory');
const Orphan = require('../models/Orphan');
const Volunteer = require('../models/Volunteer');

// Dashboard summary stats
router.get('/stats', async (req, res) => {
  try {
    const [donationCount, donorCount, totalAmount, storyCount, memoryCount, orphanCount, volunteerCount] = await Promise.all([
      Donation.countDocuments(),
      Donation.distinct('donor_name').then(arr => arr.length),
      Donation.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]).then(r => r[0]?.total || 0),
      Story.countDocuments(),
      Memory.countDocuments(),
      Orphan.countDocuments(),
      Volunteer.countDocuments(),
    ]);
    res.json({ donationCount, donorCount, totalAmount, storyCount, memoryCount, orphanCount, volunteerCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
