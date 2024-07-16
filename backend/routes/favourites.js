const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite');

// Add item to favourites
router.post('/add', async (req, res) => {
    const { userId, itemId, itemType } = req.body;
    const favouriteItem = new Favourite({ userId, itemId, itemType });
    await favouriteItem.save();
    res.status(201).json(favouriteItem);
});

// Remove item from favourites
router.delete('/remove', async (req, res) => {
    const { userId, itemId } = req.body;
    await Favourite.deleteOne({ userId, itemId });
    res.status(200).json({ message: 'Item removed from favourites' });
});

// Get user's favourites
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const favourites = await Favourite.find({ userId });
    res.status(200).json(favourites);
});

// Check if item is in favourites
router.get('/check/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;
    const item = await Favourite.findOne({ userId, itemId });
    res.status(200).json({ exists: !!item });
});

module.exports = router;
