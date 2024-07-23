const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Add a new user
router.post('/create', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/delete/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit a user
router.put('/edit/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user fields
        if (updates.username) user.username = updates.username;
        if (updates.password) user.password = updates.password;
        if (updates.role) user.role = updates.role;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user details by ID or username
router.get('/user', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const { id, username } = req.query;
        let user;
        if (id) {
            user = await User.findById(id);
        } else if (username) {
            user = await User.findOne({ username });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get users with optional filtering by username or user ID
router.get('/users', [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const { username, userId } = req.query;
        let query = {};
        if (username) {
            query.username = { $regex: username, $options: 'i' }; // case-insensitive search
        }
        if (userId) {
            query._id = userId;
        }
        const users = await User.find(query);
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
