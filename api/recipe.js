const router = new require("express").Router();
const recipeModel = require("../models/Recipe");
const userModel = require("../models/User");

//GET all recipes
router.get("/recipes", async (req, res) => {
  try {
      const recipe = await recipeModel.find({});
    // Send the list of recipes
    res.status(200).json(recipe);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});


//GET user's recipes
router.get("/:username/recipes", async (req, res) => {
  try {
    const user = req.params.username;
    const userFound = await userModel.findOne({ username: user });

    // If user not found, return 404
    if (!userFound) {
      return res.status(404).json({ message: `User ${user} not found` });
    }

    const promises = userFound.recipes.map(async (r) => {
      const recipe = await recipeModel.findOne({ _id: r });
      return recipe;
    });

    // Wait for all promises to resolve
    const recipes = await Promise.all(promises);

    // Send the list of recipes
    res.status(200).json(recipes);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

//GET recipe by regex
router.get("/recipes/:regex", async (req, res) => {
  const recipeNameRegex = new RegExp(`.*${req.params.regex}.*`, 'i');

  try {
    const recipeList = await recipeModel.find({
      recipeName: recipeNameRegex
    });

    res.send(recipeList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//GET recipe by Id
router.get("/recipes/:Id", async (req, res) => {
  const id =req.params.Id;

  try {
    const recipe = await recipeModel.find({
      recipeId: id
    });

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//POST
router.post("/:username/recipes", async (req, res) => {
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
