const express = require("express");
const router = express.Router();
const authRoute = require("../routes/auth.route");
const postRoute = require("../routes/post.route");
const categoryRoute = require("../routes/category.route");
const tagRoute = require("../routes/tag.route");
const commentRoute = require("../routes/comment.route");

router.use("/auth", authRoute);
router.use("/post", postRoute);
router.use("/category", categoryRoute);
router.use("/tag", tagRoute);
router.use("/comment", commentRoute);

module.exports = router;
