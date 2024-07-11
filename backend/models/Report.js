const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reference_id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    minlength: [10, 'Reason must be at least 10 characters long'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
