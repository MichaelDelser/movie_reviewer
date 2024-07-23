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
    const media = await Media.findOne({ tmdb_id: req.params.id });
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
    const media = await Media.findOneAndUpdate({ tmdb_id: req.params.id }, req.body, { new: true });
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

// Blacklist media by ID
router.patch('/blacklist/:tmdb_id', async (req, res) => {
  try {
    const media = await Media.findOneAndUpdate(
        { tmdb_id: req.params.tmdb_id },
        { isBlacklisted: true },
        { new: true }
    );
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unblacklist media by ID
router.patch('/unblacklist/:tmdb_id', async (req, res) => {
  try {
    const media = await Media.findOneAndUpdate(
        { tmdb_id: req.params.tmdb_id },
        { isBlacklisted: false },
        { new: true }
    );
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blacklisted media by TMDB IDs
router.post('/blacklisted', async (req, res) => {
  const { ids } = req.body;
  try {
    const blacklistedItems = await Media.find({ tmdb_id: { $in: ids }, isBlacklisted: true });
    res.status(200).json(blacklistedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
