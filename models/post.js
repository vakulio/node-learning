const mongoose = require('mongoose');

const Schena = mongoose.Schema;

const postSchema = new Schena(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    creator: {
      // type: Schena.Types.ObjectId,
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
