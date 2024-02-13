const router = new require("express").Router();
const recipeModel = require("../models/Recipe");
const userModel = require("../models/User");

router.get("/", (req, res) => {
  res.render("index.html", { messege: "GET Recipes" });
});

//POST
router.post("/:username", async (req, res) => {
  const recipeName = req.body.recipeName;
  const photo = req.body.photo;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;

  const recipeExist = await recipeModel.findOne({ recipeName: recipeName });
  const user = await userModel.findOne({ username: req.params.username });
  if (recipeExist) {
    const exist = await user.recipes.find((x) => (x._id = recipeExist._id));
    if (exist) return res.status(400).send("Recipe name exists");
  }

  const recipe = new recipeModel({
    recipeName: recipeName,
    photo: photo,
    ingredients: ingredients,
    directions: directions,
  });

  user.recipes.push(recipe);

  try {
    await recipe.save();
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
