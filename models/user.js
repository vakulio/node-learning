const mongoose = require('mongoose');

const Schena = mongoose.Schema;

const userSchema = new Schena({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'I am new!'
  },
  posts: [{
    type: Schena.Types.ObjectId,
    ref: 'Post'
  }]
});

module.exports = mongoose.model('User', userSchema);
