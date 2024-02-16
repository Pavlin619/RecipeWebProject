const router = new require("express").Router();
const userModel = require("../models/User");
const recipeRouter = require("./recipe");
const commentRouter = require("./comment");

router.use("/comments", commentRouter);
router.use("/", recipeRouter);

//GET user
router.get("/:username", async (req, res) => {
  const userExist = await userModel.findOne({ username: req.params.username });
  if (!userExist)
    return res.status(400).send(`User ${req.params.username} not exist`);

  res.status(200).send(userExist.id);
});

//GET all users
router.get("/", async (req, res) => {
  const userList = await userModel.find({});
  res.send(userList);
});


//delete user
router.delete("/:username",async (req,res)=>{
  const userExist = await userModel.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email or Password Invalid");
  try {
    await userExist.deleteOne().then((val) => {
      res.status(201).json({ message: "User Deleted Successfully", user: val });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


module.exports = router;
