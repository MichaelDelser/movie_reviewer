const mongoose = require('mongoose');

const titleEpisodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    index: true,
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  episode_number: {
    type: Number,
    required: [true, 'Episode number is required'],
    min: [1, 'Episode number must be at least 1']
  },
  season_number: {
    type: Number,
    required: [true, 'Season number is required'],
    min: [1, 'Season number must be at least 1']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  release_date: { type: Date, required: [true, 'Release date is required'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TitleEpisode', titleEpisodeSchema);
