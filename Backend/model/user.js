const mongoose = require("mongoose");
const fileSchema = require("./file");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  files: [fileSchema],
});

module.exports = userSchema;