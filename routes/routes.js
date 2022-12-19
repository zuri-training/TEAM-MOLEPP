const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();

// const { signup, login, homepage } = require("../controllers/authController");
// const fileSplitter = require("../services/fileSplitter.service");
const { fileSplitter, getFiles } = require("../services/user.service");
const { landingPage } = require("../controllers/pageController");

const router = express.Router();

var path = require("path");

router.use(express.static(path.join(__dirname, "../public")));
/* GET home page. */
router.get("/", landingPage);
router.get("/home", landingPage);
router.get("/index", landingPage);

// // router.post("/files/:id", upload.any(), fileSplitter);
// router.post("/files/:id", fileSplitter);

// router.get("/files/:id", getFiles);

module.exports = router;
