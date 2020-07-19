const router = require("express").Router();
const User = require("../models/user.model");
//Librairie pour crypter password
const bcrypt = require("bcrypt");
//Librairie creation token
const jwt = require("jsonwebtoken");
const fs = require("fs");
const RSA_PRIVATE_KEY = fs.readFileSync("./hideData/rsa/key");
const RSA_PUBLIC_KEY = fs.readFileSync("./hideData/rsa/key.pub");

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
        expiresIn: "900s",
        subject: user._id.toString(),
      });
      res.status(200).json(token);
    } else {
      res.status(401).json("Echec authentification.");
    }
  });
});

//REFRESH TOKEN
router.get("/refresh-token", (req,res) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token , RSA_PUBLIC_KEY , (error , decoded) => {
      console.log(decoded);
      if(error){ return res.status(403).json('token invalid')}
      const newToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: "900s",
        subject: decoded.sub
      });
      res.status(200).json(newToken);
    })
  } else {
    res.status(403).json('No token to refresh');
  }
})

module.exports = router;
