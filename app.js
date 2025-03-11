var express = require("express");
var app = express();
var controller = require(__dirname + "/apps/controllers");
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use(controller);
app.use("/partical", express.static(__dirname + "/views/partical"));

var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(3000, function () {
  console.log("server is running on http://localhost:3000");
});
