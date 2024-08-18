const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isRedirectUrl } = require("../midlewares.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.singUpForm);

router.post("/signup", wrapAsync(userController.registerUser));

router.get("/login", userController.loginForm);

router.post(
  "/login",
  isRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginingIn
);

router.get("/logout", userController.logOut);

module.exports = router;
