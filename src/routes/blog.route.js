const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const { dataValidate } = require("../utils/vaidation");
const { createBlogSchema, updateBlogSchema } = require("../schema/blog.schema");

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPost);
router.get("/user/blog", controller.getUserPost);

router.post(
  "/",
  [isAuthenticated],
  dataValidate(createBlogSchema),
  controller.createPost
);

router.put(
  "/",
  [isAuthenticated],
  dataValidate(updateBlogSchema),
  controller.updatePost
);
router.put("/like", [isAuthenticated], controller.createLikePost);

router.delete("/", [isAuthenticated], controller.deletePost);

module.exports = router;
