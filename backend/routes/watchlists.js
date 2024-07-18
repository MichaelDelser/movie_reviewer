const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const mongoose = require('mongoose'); // Ensure mongoose is imported

// Add item to watchlist
router.post('/add', async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;

        // Validate itemType
        if (!['movie', 'tv'].includes(itemType.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid item type' });
        }

        const watchlistItem = new Watchlist({
            userId: new mongoose.Types.ObjectId(userId),
            itemId: itemId.toString(),
            itemType: itemType.toLowerCase()
        });

        await watchlistItem.save();
        res.status(201).json(watchlistItem);
    } catch (err) {
        console.error('Error adding item to watchlist:', err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

module.exports = router;

// Remove item from watchlist
router.delete('/remove', async (req, res, next) => {
    try {
        const { userId, itemId } = req.body;
        await Watchlist.deleteOne({ userId, itemId });
        res.status(200).json({ message: 'Item removed from watchlist' });
    } catch (err) {
        next(err);
    }
});

// Get user's watchlist
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const watchlist = await Watchlist.find({ userId });
        res.status(200).json(watchlist);
    } catch (err) {
        next(err);
    }
});

// Check if item is in watchlist
router.get('/check/:userId/:itemId', async (req, res, next) => {
    try {
        const { userId, itemId } = req.params;
        const item = await Watchlist.findOne({ userId, itemId });
        res.status(200).json({ exists: !!item });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
