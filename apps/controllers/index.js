var express = require("express");
var router = express.Router();
router.use("/home", require(__dirname + "/homecontroller"));
router.use("/product", require(__dirname + "/productcontroller"));
router.use("/service", require(__dirname + "/serviceController"));
router.use("/contact", require(__dirname + "/contactController"));
router.use("/about", require(__dirname + "/aboutController"));
router.use("/admin", require(__dirname + "/admin/adminController"));
router.get("/", function (req, res) {
  res.render("index.ejs");
});
module.exports = router;
