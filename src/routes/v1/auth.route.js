const express = require("express");
const passport = require("passport");
const {authController} = require("../../controllers")

const router = express.Router();

// Local auth
router.post("/signup", authController.signUp);
router.post("/login", passport.authenticate("local"), authController.login);
router.get("/logout", authController.logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);


module.exports = router;
