const mongoose = require('mongoose');
const shortid = require('shortid')

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  googleId: {
    type: String,
    default: shortid(),
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);