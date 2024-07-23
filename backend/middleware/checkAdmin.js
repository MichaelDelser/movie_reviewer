const User = require('../models/User'); // Adjust the path as needed

const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.body.userId || req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.isAdmin = user.role === 'admin';

        next();
    } catch (err) {
        console.error('Error checking admin role:', err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

module.exports = checkAdmin;
