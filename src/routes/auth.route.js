const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/login", controller.Login);
router.post("/register", controller.Register);

module.exports = router;
