const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  fileName: String,
  fileExtension: String,
  chunks: [Buffer],
});

const fileModel = model("fileModel", fileSchema);
// module.exports = fileModel;
module.exports = { fileSchema, fileModel };
