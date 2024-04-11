const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义 Review 模式
const card = new Schema({
  _id: String,
  reviewer_id: String,
  title: String,
  content: String,
  images: [String],
  status: String,
  createdAt: Date,
  postedAt: Date,
  deletedAt: Date,
  isDeleted: Boolean,
  reason: String,
  reason_type: String,
  updatedAt: Date,
  username: String
});

// 创建 Review 模型
const CardModel = mongoose.model('Review', card);

module.exports = CardModel;
