const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();

const { signup, login, homepage } = require("../controllers/authController");
// const fileSplitter = require("../services/fileSplitter.service");
const { fileSplitter, getFiles } = require("../services/user.service");

const router = express.Router();

// ...
router.get("/", homepage);

// ...
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  signup
);

// ...
router.post("/login", login);

// router.post("/files/:id", upload.any(), fileSplitter);
router.post("/files/:id", fileSplitter);

router.get("/files/:id", getFiles);

module.exports = router;
