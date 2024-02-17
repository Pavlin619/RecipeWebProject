const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recipeName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("recipes", RecipeSchema);
