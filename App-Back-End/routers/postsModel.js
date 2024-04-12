const mongoose = require('mongoose');


// 定义图片子模式
const imageSchema = new mongoose.Schema({
  width: { type: String, required: true },
  height: { type: String, required: true },
  thumbURL: { type: String, required: true }
});



const postSchema = new mongoose.Schema({
  _id: {type: String,require:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  images: { type: [imageSchema], required: true }, // 使用图片子模式数组
  status: {type: String, required: true}, // draft, committed, rejected, published
  createdAt: {type: Date},
  postedAt: {type: Date},
  updatedAt: {type: Date},
  deletedAt: {type: Date},
  isDeleted: {type: Boolean, default: false},
  reason_type: {type: String},
  reason: {type: String},
  username:{type:String,require:true},
  userImg:{type: String, required: true}
});

module.exports = mongoose.model('Posts', postSchema);



