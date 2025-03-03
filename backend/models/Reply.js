const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reply', ReplySchema);