const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Create new media
router.post('/', async (req, res) => {
  try {
    const mediaData = {};
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key) && Media.schema.paths[key]) {
        mediaData[key] = req.body[key];
      }
    }
    const media = new Media(mediaData);
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all media
router.get('/', async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get media by ID
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update media by ID
router.put('/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete media by TMDB ID
router.delete('/:tmdb_id', async (req, res) => {
  try {
    const media = await Media.findOneAndDelete({ tmdb_id: req.params.tmdb_id });
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
