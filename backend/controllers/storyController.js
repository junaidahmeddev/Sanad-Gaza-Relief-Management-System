// controllers/storyController.js
const Story = require('../models/Story');
const path = require('path');
const fs = require('fs');

const createStory = async (req, res) => {
  
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, description, type } = req.body;
    const image = req.files?.image?.[0]?.filename || '';
    const video = req.files?.video?.[0]?.filename || '';

    const newStory = new Story({
      title,
      description,
      type,
      image,
      video,
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    console.error("❌ Error in createStory:", err);
    res.status(500).json({ error: 'Failed to submit story' });
  }
};

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.status(200).json(stories); // ✅ must return an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const stories = await Story.find({ type, approved: true }).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByType,
  approveStory,
  deleteStory,
};
