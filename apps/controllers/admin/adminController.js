var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
  //   res.json({ message: "this is admin page 1" });
  res.render("admin/index.ejs");
});
router.get("/user", function (req, res) {
  //   res.json({ message: "this is user manager page" });
  res.render("admin/userManager.ejs");
});
module.exports = router;
