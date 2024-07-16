const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: String, required: true }, // TMDB ID
    itemType: { type: String, enum: ['movie', 'tv'], required: true },
    addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
