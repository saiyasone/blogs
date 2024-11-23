const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const { dataValidate } = require("../utils/vaidation");

const { createCommentSchema } = require("../schema/comment.schema");

router.get("/:postId", controller.getCommentByPost);
router.post(
  "/",
  [isAuthenticated],
  dataValidate(createCommentSchema),
  controller.createComment
);

router.put("/", [isAuthenticated], controller.updateComment);

module.exports = router;
