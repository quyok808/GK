var express = require("express");
var router = express.Router();
router.use("/", function (req, res) {
  //   res.json({ message: "this is product page" });
  res.render("contact.ejs");
});
module.exports = router;
