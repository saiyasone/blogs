const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.get("/login", [isAuthenticated], controller.UserLogin);
router.get("/profile", controller.getPulicUser);

router.put("/", [isAuthenticated], controller.updateProfile);

module.exports = router;
