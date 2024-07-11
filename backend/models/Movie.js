const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    index: true,
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  release_date: { type: Date, required: [true, 'Release date is required'] },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    minlength: [3, 'Genre must be at least 3 characters long'],
    maxlength: [50, 'Genre cannot exceed 50 characters']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
