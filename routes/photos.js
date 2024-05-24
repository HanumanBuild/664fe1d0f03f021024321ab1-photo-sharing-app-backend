const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const { protect } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('photo'), async (req, res) => {
  const { description } = req.body;
  const imageUrl = req.file.path;
  try {
    const photo = await Photo.create({ user: req.user._id, imageUrl, description });
    res.status(201).json(photo);
  } catch (error) {
    res.status(400).json({ message: 'Failed to upload photo' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const photos = await Photo.find({ user: req.user._id });
    res.json(photos);
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve photos' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await photo.remove();
    res.json({ message: 'Photo removed' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete photo' });
  }
});

module.exports = router;
