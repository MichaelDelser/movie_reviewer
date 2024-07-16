const express = require('express');
const router = express.Router();
const Watchlists = require('../models/Watchlist');

// Add item to watchlist
router.post('/add', async (req, res) => {
    const { userId, itemId, itemType } = req.body;
    const watchlistItem = new Watchlists({ userId, itemId, itemType });
    await watchlistItem.save();
    res.status(201).json(watchlistItem);
});

// Remove item from watchlist
router.delete('/remove', async (req, res) => {
    const { userId, itemId } = req.body;
    await Watchlists.deleteOne({ userId, itemId });
    res.status(200).json({ message: 'Item removed from watchlist' });
});

// Get user's watchlist
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const watchlist = await Watchlists.find({ userId });
    res.status(200).json(watchlist);
});

// Check if item is in watchlist
router.get('/check/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;
    const item = await Watchlists.findOne({ userId, itemId });
    res.status(200).json({ exists: !!item });
});

module.exports = router;
