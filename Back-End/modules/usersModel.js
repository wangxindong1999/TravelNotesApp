const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uri =
  "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/travels?retryWrites=true&w=majority&appName=Ctrip"
const user = mongoose.createConnection(uri)
user.on("connected", () => console.log("User database connected"))

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isReviewer: { type: Boolean, default: false },
  admin_id: { type: String, default: null },
  reviewer_id: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userImg: { type: String },
})

module.exports = user.model("Users", userSchema)
