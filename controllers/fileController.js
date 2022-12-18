var express = require("express");
var router = express.Router();

const fs = require("fs");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");
const userModel = require("../model/user.schema");
const fileSplitter = require("../services/fileSplitter.service");

// /* GET users listing. */
router.post("/", async (req, res, next) => {
  await fileSplitter(req, res, next);
});

module.exports = router;
