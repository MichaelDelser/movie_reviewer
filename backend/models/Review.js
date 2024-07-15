const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content_id: { type: String, required: true, index: true },  // Assuming content_id is a string
  content_type: { type: String, required: true, enum: ['Movie', 'TVShow', 'Episode'] },
  title: { type: String, required: true, minlength: 5, maxlength: 100 },
  content: {
    type: String,
    validate: {
      validator: function(value) {
        // Allow content to be empty or meet the length requirements
        return !value || (value.length >= 10 && value.length <= 1000);
      },
      message: 'Content must be between 10 and 1000 characters if provided'
    }
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating cannot exceed 10']
  },
  helpfulness: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
