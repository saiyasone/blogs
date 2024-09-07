const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.get("/:postId", controller.getCommentByPost);
router.post("/", [isAuthenticated], controller.createComment);

router.put("/", [isAuthenticated], controller.updateComment);

module.exports = router;
