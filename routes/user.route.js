const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();
const { UserModel } = require("../models/user.model");

userRoute.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      const newuser = new UserModel({
        email: email,
        password: hash,
      });
      await newuser.save();
    });
    res.status(200).send("User created");
  } catch (error) {
    console.log(error);
    res.send(400).send("Internal error");
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    if (!user) {
      console.log("Unauthorized access");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    res.send(400).send("Internal error");
  }
});

module.exports = { userRoute };
