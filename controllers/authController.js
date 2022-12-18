var express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

exports.homepage = async (req, res, next) => {
  let dirr = __dirname.slice(0, __dirname.length - 12);

  console.log(path.join(dirr + "/frontend/index.html"));
  res.sendFile(path.join(dirr + "/frontend/index.html"));
  //__dirname : It will resolve to your project folder.

  // let request = getReqUrl(req.url);
  // console.log(__dirname);
  // let dirr = __dirname.slice(0, __dirname.length - 12);
  // console.log(dirr);
  // let filePath = path.join(dirr, "./frontend", request || req.url);
  // console.log(filePath);
  // let contentType = getContentType(filePath) || "index.html";
  // let emptyPath = path.join(__dirname, "public", "404.html");
  // fs.readFile(filePath,'utf8', (err,content) => {
  // fs.readFile(filePath, (err, content) => {
  //   if (err) {
  //     if (err.code == "ENOENT") {
  //       // console.log('errrrr===',err)
  //       fs.readFile(emptyPath, "utf8", (err, content) => {
  //         res.writeHead(200, { "Content-Type": contentType });
  //         res.end(content);
  //       });
  //     } else {
  //       res.writeHead(500);
  //       res.end("<h1>A server error has occured</h1>");
  //     }
  //   }
  //   if (!err) {
  //     res.writeHead(200, { "Content-Type": contentType });
  //     res.end(content);
  //   }
  // });
  // res.sendFile(filePath);
  //   console.log(req.url);
  // });
  // res.json({
  //   message: "Reached home page successfully",
  //   user: "You",
  // });
};

exports.signup = async (req, res, next) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
};

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

// module.exports = router;
const getContentType = (filePath) => {
  // console.log(filePath)
  let extname = path.extname(filePath).toLowerCase();
  if (extname == ".js") {
    return "text/javascript";
  }
  if (extname == ".css") {
    return "text/css";
  }
  if (extname == ".js") {
    return "text/html";
  }
  if (extname == ".png") {
    return "image/png";
  }
  if (extname == ".jpg") {
    return "image/jpg";
  }
};

const getReqUrl = (req) => {
  if (req == "/" || req == "/home") {
    return "index.html";
  }
  if (req == "/contact") {
    return "contact.html";
  }
  if (req == "/about") {
    return "about.html";
  }
};
