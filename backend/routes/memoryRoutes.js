// routes/memoryRoutes.js
const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');

// Create Memory
router.post('/', async (req, res) => {
  try {
    const memory = new Memory(req.body);
    await memory.save();
    res.status(201).json(memory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all approved Memories (for public frontend)
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find({ approved: true }).sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single Memory
router.get('/:id', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) return res.status(404).json({ error: 'Not found' });
    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin route: Get all memories (approved and unapproved)
router.get('/admin/all', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin route: Approve memory
router.patch('/:id/approve', async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!memory) return res.status(404).json({ error: 'Memory not found' });
    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Memory
router.put('/:id', async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!memory) return res.status(404).json({ error: 'Not found' });
    res.json(memory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Memory
router.delete('/:id', async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
