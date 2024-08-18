const user = require("../models/user.js");

module.exports.singUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new user({ username, email });
    let registeredUser = await user.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      } else {
        req.flash("success", "Welcome To Wander Lust");
        res.redirect("/listings");
      }
    });
  } catch (e) {
    req.flash("error", `${e.message}`);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginingIn = async (req, res) => {
  req.flash("success", "Welcome Back to Wanderlust");
  let redirect = res.locals.redirectUrl || "/listings";
  res.redirect(redirect);
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "Successfully logout");
      res.redirect("/login");
    }
  });
};
