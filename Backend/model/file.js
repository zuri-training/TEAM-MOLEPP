const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({
  fileName: String,
  fileExtension: String,
  chunks: [Buffer],
});

module.exports = fileSchema;