const mongoose = require("mongoose")

// 定义图片子模式
const imageSchema = new mongoose.Schema({
  width: { type: String, required: true },
  height: { type: String, required: true },
  thumbURL: { type: String, required: false },
  base64: { type: String, required: true },
})

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: { type: [imageSchema], required: true }, // 使用图片子模式数组
  status: { type: String, required: true }, // draft, committed, rejected, published
  createdAt: { type: Date, default: Date.now },
  postedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
  reason_type: { type: String, default: null },
  reason: { type: String, default: null },
  username: { type: String, required: true },
  userImg: { type: String, required: true },
})

module.exports = mongoose.model("Posts", postSchema)
