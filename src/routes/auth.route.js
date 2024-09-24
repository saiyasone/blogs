const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuth = require("../middlewares/isAuthenticated.middleware");
const controller = require("../controllers/auth.controller");

router.post("/login", controller.Login);
router.post("/register", controller.Register);
router.post("/reset-password", [isAuth], controller.ResetPassword);

// auth google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `/api/v1/auth/google/success`,
    failureRedirect: "/api/v1/auth/google/failed",
  })
);
router.get("/google/success", controller.GoogleSignIn);
router.get("/google/failed", (_, res) => {
  res.send("<html> Failed to authorize </html>").status(404);
});

module.exports = router;
