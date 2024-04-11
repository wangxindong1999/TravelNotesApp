const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isReviewer: { type: Boolean, default: false },
  admin_id: { type: String, default: null },
  reviewer_id: { type: String, default: null },
  createdAt: { type: String },
  updatedAt: { type: String },
  userImg: { type: String },
})

module.exports = mongoose.model("pcusers", userSchema)
