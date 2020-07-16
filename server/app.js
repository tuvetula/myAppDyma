var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const index = require('./routes/index');
const mongoDbLink = require('./hideData/mongodb');

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

mongoose.connect(mongoDbLink
 ,
  { keepAlive: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connexion db ok!");
    }
  }
);

app.use(index);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

module.exports = app;
