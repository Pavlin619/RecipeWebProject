const { registerValidation, loginValidation } = require("../utils/validation");

const router = new require("express").Router();
const userRouter = require("./user");
const userModel = require("../models/User");

router.use("/users", userRouter);

//login
router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const userExist = await userModel.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email or Password Invalid");

  if (req.body.password !== userExist.password)
    return res.status(400).send("Invalid Password");

    res.status(200).send(userExist);
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

module.exports = router;
