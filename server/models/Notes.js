const mongoose = require('mongoose');
const shortid = require('shortid')

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  _id: {
    type: String,
    default: shortid(), // magic!
    trim: true,
  },
  user: {
    type: String,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  topic: {
    type:String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Note', NoteSchema);

