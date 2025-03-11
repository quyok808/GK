var express = require("express");
var router = express.Router();
router.use("/", function (req, res) {
  //   res.json({ message: "this is product page" });
  res.render("service.ejs");
});
module.exports = router;
