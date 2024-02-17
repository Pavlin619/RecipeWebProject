const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  Id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipes',
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comments", CommentSchema);
