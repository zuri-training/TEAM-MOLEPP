const userModel = require("../model/user.schema");
const bcrypt = require("bcrypt");

exports.landingPage = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("index");
};

//REGISTER USERS
exports.register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body["password-confirm"];

    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already Exists!");
    }
    if (password !== confirmPassword) {
      return res
        .status(500)
        .send("Confirm password does not match initial password. ");
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      email: email.toLowerCase(),
      password: hashpassword,
    });

    const user = await newUser.save();

    res.render("Dashboard", { user: user });
  } catch (error) {
    return res.status(500).send("An Error occurred ");
  }
};

// LOGIN USERS
exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Invalid Details");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(409).send("Invalid Password Try Again");
    }

    res.render("Dashboard", { user: user });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

//LOGIN FORM
exports.loginForm = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("login");
};

//DASHBOARD
exports.dashboard = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("Dashboard");
};

//forgotPassword
exports.forgotPassword = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("forgotPassword");
};

//DOWNLOAD
exports.download = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("download");
};

//SAVED
exports.saved = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("saved");
};

//FILES
exports.files = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("files");
};

//SAVE
exports.save = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("save");
};

//REGISTRATION FORM
exports.registerForm = (req, res) => {
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });

  res.render("register");
};

//HANDLE FILE SPLIT
exports.fileHandler = (req, res) => {
  // console.log("reqbody", req.body);
  req.on("error", (error) => {
    console.log(error);
    res.sendStatus(400);
  });
  // res.write(req.body.file[0]);
  res.render("Dashboard");
};
