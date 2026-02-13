// routes/blacklistRoutes.js
const express = require('express');
const router = express.Router();
const Blacklist = require('../models/Blacklist');

// Create Blacklist Entry
router.post('/', async (req, res) => {
  try {
    const entry = new Blacklist(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Blacklist Entries
router.get('/', async (req, res) => {
  try {
    const entries = await Blacklist.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single Blacklist Entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await Blacklist.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Blacklist Entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await Blacklist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Blacklist Entry
router.delete('/:id', async (req, res) => {
  try {
    await Blacklist.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
