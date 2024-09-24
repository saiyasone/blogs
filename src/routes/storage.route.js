const express = require("express");
const router = express.Router();
const multer = require("../configs/multer.config");
const controller = require("../controllers/storage.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.post(
  "/upload",
  [isAuthenticated],
  multer.single("file"),
  controller.upload
);

router.post("/delete", [isAuthenticated], controller.deleteFile);

module.exports = router;
