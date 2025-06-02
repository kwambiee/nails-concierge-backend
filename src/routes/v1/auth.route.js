const express = require("express");
const passport = require("passport");
const { authController } = require("../../controllers");
const { generateToken } = require("../../utils/jwt");

const router = express.Router();

// Local auth
router.post("/signup", authController.signUp);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: info?.message || "Login failed",
        user: user,
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      user: user,
      token: token,
    });
  })(req, res, next); // ← Call the inner function
});
router.get("/logout", authController.logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    // Redirect to your frontend with token as query param or handle via cookie
    res.redirect(`/dashboard?token=${token}`);
  }
);

module.exports = router;
