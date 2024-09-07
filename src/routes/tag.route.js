const express = require("express");
const router = express.Router();
const controller = require("../controllers/tag.controller");

router.get("/", controller.getAllTags);
router.get("/:id", controller.getTag);

router.post("/", controller.createTag);
router.put("/", controller.updateTag);
router.delete("/", controller.deleteTag);

module.exports = router;
