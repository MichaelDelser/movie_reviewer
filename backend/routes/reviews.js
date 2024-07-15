const express = require('express');
const { check, validationResult } = require('express-validator');
const Review = require('../models/Review');
const router = express.Router();

router.post('/add', [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('content_id').notEmpty().withMessage('Content ID is required'),
  check('content_type').isIn(['Movie', 'TVShow', 'Episode']).withMessage('Content type must be Movie, TVShow, or Episode'),
  check('title').isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  check('rating').isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  check('content').custom(value => {
    if (value && (value.length < 10 || value.length > 1000)) {
      throw new Error('Content must be between 10 and 1000 characters if provided');
    }
    return true;
  }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, content_id, content_type, title, content, rating } = req.body;

  console.log('Received review data:', req.body);

  try {
    const review = new Review({ user_id, content_id, content_type, title, content, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error saving review:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fetch reviews for a specific content
router.get('/:content_type/:content_id', async (req, res) => {
  const { content_type, content_id } = req.params;
  try {
    const reviews = await Review.find({ content_type, content_id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upvote a review
router.patch('/upvote/:review_id', async (req, res) => {
  const { review_id } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(
        review_id,
        { $inc: { helpfulness: 1 } },
        { new: true }
    );
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
