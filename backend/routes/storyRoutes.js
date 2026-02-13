const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByType,
  approveStory,
  deleteStory,
} = require('../controllers/storyController');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // You can create this folder manually
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'image' }, { name: 'video' }]), createStory);
router.get('/', getAllStories);
router.get('/type/:type', getStoriesByType);
router.get('/:id', getStoryById);
router.patch('/:id/approve', approveStory);
router.delete('/:id', deleteStory);

module.exports = router;
