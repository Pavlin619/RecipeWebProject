const router = new require("express").Router();
const commentModel = require("../models/Comment");
const recipeModel = require("../models/Recipe");


//GET comments of recipe
router.get("/:recipeId", async (req, res) => {
    const id = req.params.recipeId;
    try {
        const recipeExist = await recipeModel.findOne({ _id: id });
        if (!recipeExist) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const listComments = await commentModel.find({ recipe: recipeExist._id });
        res.status(200).json(listComments);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//POST
router.post("/:recipeId", async (req, res) => {
    const comment = req.body.comment;
    const userName = req.body.user;
    const date = new Date().getDate;
    const recipeId=req.params.recipeId;
  
    const commentToSave = new commentModel({
      comment: comment,
      user: userName,
      date: date,
      recipe: recipeId
    });
    
    try {
      await commentToSave.save();
      res.status(200).json(commentToSave);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  module.exports = router;
  

