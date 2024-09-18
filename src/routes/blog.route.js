const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPost);
router.get("/user/blog", controller.getUserPost);

router.post("/", [isAuthenticated], controller.createPost);

router.put("/", [isAuthenticated], controller.updatePost);
router.put("/like", [isAuthenticated], controller.createLikePost);

router.delete("/", [isAuthenticated], controller.deletePost);

module.exports = router;
