// routes/orphanRoutes.js
const express = require('express');
const router = express.Router();
const Orphan = require('../models/Orphan');

// Create Orphan
router.post('/', async (req, res) => {
  try {
    const orphan = new Orphan(req.body);
    await orphan.save();
    res.status(201).json(orphan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Orphans
router.get('/', async (req, res) => {
  try {
    const orphans = await Orphan.find().sort({ createdAt: -1 });
    res.json(orphans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single Orphan
router.get('/:id', async (req, res) => {
  try {
    const orphan = await Orphan.findById(req.params.id);
    if (!orphan) return res.status(404).json({ error: 'Not found' });
    res.json(orphan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Orphan
router.put('/:id', async (req, res) => {
  try {
    const orphan = await Orphan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orphan) return res.status(404).json({ error: 'Not found' });
    res.json(orphan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Orphan
router.delete('/:id', async (req, res) => {
  try {
    await Orphan.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
