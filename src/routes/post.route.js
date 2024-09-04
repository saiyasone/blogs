const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPost);
router.post("/", [isAuthenticated], controller.createPost);
router.put("/", [isAuthenticated], controller.updatePost);
router.delete("/", [isAuthenticated], controller.deletePost);

module.exports = router;
