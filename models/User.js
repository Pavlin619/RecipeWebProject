const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipes',
})],
});

module.exports = mongoose.model("users", UserSchema);
