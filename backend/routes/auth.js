const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateAuthToken = (user) => {
  const payload = { user: { id: user.id, role: user.role } };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });
};

// Sign Up
router.post('/signup', [
  check('username', 'Please include a valid username').not().isEmpty(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role = 'user' } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateAuthToken(user);
    res.json({ token, username: user.username, id: user.id, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Log In
router.post('/login', [
  check('username', 'Please include a valid username').not().isEmpty(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = generateAuthToken(user);
    res.json({ token, username: user.username, id: user.id, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
