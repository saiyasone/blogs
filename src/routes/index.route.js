const express = require("express");
const router = express.Router();
const authRoute = require("../routes/auth.route");
const postRoute = require("./blog.route");
const categoryRoute = require("../routes/category.route");
const tagRoute = require("../routes/tag.route");
const commentRoute = require("../routes/comment.route");
const userRoute = require("../routes/user.route");

router.use("/auth", authRoute);
router.use("/blog", postRoute);
router.use("/category", categoryRoute);
router.use("/tag", tagRoute);
router.use("/comment", commentRoute);
router.use("/user", userRoute);

module.exports = router;
