const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  reviewer_id: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  images: {type: Array, required: true},
  status: {type: String, required: true}, // draft, committed, rejected, published
  created_at: {type: Date},
  posted_at: {type: Date},
  updated_at: {type: Date},
  deleted_at: {type: Date},
  isDeleted: {type: Boolean, default: false},
  reason_type: {type: String},
  reason: {type: String},
});

module.exports = mongoose.model('Posts', postSchema);