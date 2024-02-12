const router = new require("express").Router();
const userModel = require("../models/User");

router.get("/", (req, res) => {
  res.render("index.html", { messege: "GET Users" });
});

//POST
router.post("/", (req, res) => {
  const fN = req.body.firstName;
  const lN = req.body.lastName;

  const user = new userModel({
    firstName: fN,
    lastName: lN,
  });

  try {
    user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
