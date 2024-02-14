const { registerValidation, loginValidation } = require("../utils/validation");
const router = new require("express").Router();
const userModel = require("../models/User");
const recipeRouter = require("./recipe");

router.use("/", recipeRouter);

//GET user
router.get("/:username", async (req, res) => {
  const userExist = await userModel.findOne({ username: req.params.username });
  if (!userExist)
    return res.status(400).send(`User ${req.params.username} not exist`);

  res.send(userExist);
});

//GET all users
router.get("/", async (req, res) => {
  const userList = await userModel.find({});
  res.send(userList);
});

//register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user is registered
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  const usernameExist = await userModel.findOne({
    username: req.body.username,
  });
  if (usernameExist) return res.status(400).send("Username already exist");

  //createUser
  const username = req.body.username;
  const email = req.body.email;
  const pass = req.body.password;

  const user = new userModel({
    username: username,
    email: email,
    password: pass,
  });
  try {
    await user.save().then((val) => {
      res.status(201).json({ message: "User Added Successfully", user: val });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const userExist = await userModel.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email or Password Invalid");

  if (req.body.password !== userExist.password)
    return res.status(400).send("Invalid Password");

  res.send("Signed In Successfully");
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
