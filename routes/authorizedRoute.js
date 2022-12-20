var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local");
//var crypto = require('crypto');
const userModel = require("../model/user.schema");
const {
  landingPage,
  login,
  loginForm,
  register,
  registerForm,
  dashboard,
  download,
  saved,
  files,
  save,
  fileHandler,
} = require("../controllers/pageController");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userModel[email]",
      passwordField: "userModel[password]",
    },
    function verify(email, password, done) {
      userModel
        .findOne({ email })
        .then((userModel) => {
          if (!userModel) {
            return done(null, false, { errors: { email: "is invalid" } });
          }
          const match = bcrypt.compare(req.body.password, userModel.password);
          if (!match) {
            return done(null, false, { errors: { password: "is invalid" } });
          }
          return done(null, userModel);
        })
        .catch(done);
    }
  )
);
passport.serializeUser(function (userModel, done) {
  done(null, { id: userModel.id, username: userModel.username });
});

passport.deserializeUser(function (id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
router.get("/login", loginForm);

router.post("/login/password", login);
router.get("/login/password", dashboard);
router.get("/register", registerForm);
router.post("/register/user", register);
router.get("/Dashboard", dashboard);
router.post("/Dashboard", fileHandler);
router.get("/download", download);
router.post("/download", download);
router.get("/saved", saved);
router.get("/save", save);
router.get("/files", files);
module.exports = router;
