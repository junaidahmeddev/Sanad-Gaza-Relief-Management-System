const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyAdmin = require('../middleware/verifyAdmin');
const {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByType,
  approveStory,
  deleteStory,
} = require('../controllers/storyController');

// Multer setup for file upload
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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
router.patch('/:id/approve', verifyAdmin, approveStory);
router.delete('/:id', verifyAdmin, deleteStory);

module.exports = router;
