const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  isReviewer: {type: Boolean, default: false},
  admin_id: {type: String, default: null},
  reviewer_id: {type: String, default: null},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  userImg: {type: String},
});

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('Users', userSchema);