const express = require("express");
const router = express.Router();
const authRoute = require("../routes/auth.route");
const postRoute = require("../routes/post.route");

router.use("/auth", authRoute);
router.use("/post", postRoute);

module.exports = router;
