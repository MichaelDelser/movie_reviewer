const express = require('express');
const { check, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Upvote = require('../models/Upvote');
const router = express.Router();

router.post('/add', [
  check('userId').notEmpty().withMessage('User ID is required'),
  check('itemId').notEmpty().withMessage('Content ID is required'),
  check('itemType').isIn(['Movie', 'TVShow', 'Episode']).withMessage('Content type must be Movie, TVShow, or Episode'),
  check('title').isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  check('rating').isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  check('content').custom(value => {
    if (value && (value.length < 10 || value.length > 1000)) {
      throw new Error('Content must be between 10 and 1000 characters if provided');
    }
    return true;
  }),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, itemId, itemType, title, content, rating } = req.body;

  try {
    const review = new Review({ user_id: userId, content_id: itemId, content_type: itemType, title, content, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// Fetch reviews for a specific content
router.get('/:content_type/:content_id', async (req, res, next) => {
  const { content_type, content_id } = req.params;
  try {
    const reviews = await Review.find({ content_type, content_id });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// Upvote a review
router.patch('/upvote/:review_id', async (req, res, next) => {
  const { review_id } = req.params;
  const { user_id } = req.body;

  try {
    // Check if the user has already upvoted this review
    const existingUpvote = await Upvote.findOne({ userId: user_id, reviewId: review_id });
    if (existingUpvote) {
      return res.status(400).json({ msg: 'User has already upvoted this review' });
    }

    // Increment the helpfulness count in the review
    const review = await Review.findByIdAndUpdate(
        review_id,
        { $inc: { helpfulness: 1 } },
        { new: true }
    );
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Add the upvote to the Upvote collection
    const upvote = new Upvote({
      reviewId: review_id,
      userId: user_id
    });
    await upvote.save();

    res.json(review);
  } catch (err) {
    next(err);
  }
});

// Check if user has upvoted a review
router.post('/hasUpvoted', async (req, res, next) => {
  const { userId, reviewId } = req.body;

  try {
    const upvote = await Upvote.findOne({ userId, reviewId });
    if (upvote) {
      return res.status(200).json({ hasUpvoted: true });
    }
    res.status(200).json({ hasUpvoted: false });
  } catch (err) {
    next(err);
  }
});

// Remove a review
router.delete('/remove/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findOneAndDelete({ _id: reviewId, user_id: userId });
    if (!review) {
      return res.status(404).json({ msg: 'Review not found or user not authorized' });
    }
    res.status(200).json({ msg: 'Review removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
