const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Please authenticate' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    console.log("debug3")
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};
