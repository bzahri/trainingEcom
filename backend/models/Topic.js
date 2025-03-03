const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Topic', TopicSchema);