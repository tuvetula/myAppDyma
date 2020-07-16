const router = require("express").Router();
const User = require("../models/user.model");
//Librairie pour crypter password
const bcrypt = require("bcrypt");
//Librairie creation token
const jwt = require("jsonwebtoken");
const fs = require("fs");
const RSA_PRIVATE_KEY = fs.readFileSync("./hideData/rsa/key");

router.post("/signup", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    firstName: req.body.firstName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
  });
  newUser.save((err) => {
    if (err) {
      res.status(500).json("erreur signup !");
    }
    res.status(200).json("signup ok");
  });
});

router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: "RS256",
        subject: user._id.toString(),
      });
      res.status(200).json(token);
    } else {
      res.status(401).json("signin fail!");
    }
  });
});

module.exports = router;
