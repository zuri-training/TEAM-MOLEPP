const createError = require("http-errors");
const express = require("express");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");

require("./services/auth.service");
const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");
const connect = require("./utils/database");

connect(
  "mongodb+srv://Tobae:tobssetup@chunkfile.2ugmv4k.mongodb.net/chunkit?retryWrites=true&w=majority"
);
// connect();
const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
// app.use(logger("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  secureRoute
);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.listen(3000, () => {
//   console.log("Server started.");
// });

module.exports = app;
