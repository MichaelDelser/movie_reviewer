const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported
const router = express.Router();
const Favourite = require('../models/Favourite');

// Add item to favourites
router.post('/add', async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;

        // Validate itemType
        if (!['movie', 'tv'].includes(itemType.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid item type' });
        }

        const favouriteItem = new Favourite({
            userId: new mongoose.Types.ObjectId(userId),
            itemId: itemId.toString(),
            itemType: itemType.toLowerCase()
        });

        await favouriteItem.save();
        res.status(201).json(favouriteItem);
    } catch (err) {
        console.error('Error adding item to favourites:', err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Remove item from favourites
router.delete('/remove', async (req, res, next) => {
    try {
        const { userId, itemId } = req.body;
        await Favourite.deleteOne({ userId, itemId });
        res.status(200).json({ message: 'Item removed from favourites' });
    } catch (err) {
        next(err);
    }
});

// Get user's favourites
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const favourites = await Favourite.find({ userId });
        res.status(200).json(favourites);
    } catch (err) {
        next(err);
    }
});

// Check if item is in favourites
router.get('/check/:userId/:itemId', async (req, res, next) => {
    try {
        const { userId, itemId } = req.params;
        const item = await Favourite.findOne({ userId, itemId });
        res.status(200).json({ exists: !!item });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
