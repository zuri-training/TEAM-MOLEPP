const fs = require("fs");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");
const multer = require("multer");
const userModel = require("../model/user.schema");
const { fileModel } = require("../model/file.schema");

const bodyParser = require("body-parser");
const { Module } = require("module");

exports.fileSplitter = async (req, res, next) => {
  // Array for holding individual chunks of data in data stream
  console.log("body", req.body);
  let arr = [];
  //   let { chunkSize } = req.body;

  let chunkSize = 64 * 1024;

  // id that will be used to save the data in memcached library
  //   let id = req.params.id;
  //   try {
  let id = { _id: req.params.id };
  //     console.log("id:", id);
  //     let user = await userModel.findById(id);
  //     if (!user) {
  //       return res.status(404).send("No user with matching id found!");
  //     }
  //     res.status(200).json({
  //       success: true,
  //       message: "USER FOUND!",
  //       user,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Internal server error",
  //       error: e.message,
  //     });
  //   }

  //   event listener for incoming data
  req.on("data", (chunk) => {
    // add chunk to array
    arr.push(chunk);

    console.log(`Number of chunks in byte stream: ${arr.length}`);
  });

  // event listener for end of data processing
  req.on("end", async () => {
    console.log("all chunks came through");
    const file = Buffer.concat(arr);
    // const readStream = fs.createReadStream(file, { highWaterMark: chunkSize });
    let tempChunks = [];
    const rechunkedFile = [];
    const numOfBytePerChunk = chunkSize / 1024;
    let counted = 1;
    let iterations = 0;
    for (const byte of file.values()) {
      tempChunks.push(byte);
      if (
        counted == numOfBytePerChunk ||
        file.values().length - 1 == iterations
      ) {
        const temp = Buffer.from(tempChunks);
        rechunkedFile.push(temp);
        tempChunks = [];
        counted = 1;
        iterations++;
        continue;
      }
      counted++;
      iterations++;
    }

    // readStream.on("end", async () => {
    const savedFile = await fileModel.create({ chunks: rechunkedFile });
    await userModel.findByIdAndUpdate(id, { $push: { files: savedFile } });
    res.send({ status: "success!!", key: `${id}` });
    // });

    // send response to client side.
  });
  //   });

  //   app.get("/data/:id", async (req, res) => {
  //     let id = req.params.id;
  //   });
};

exports.getFiles = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let user = await userModel.findOne(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Files found!",
      files: user.files,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};
// module.exports = fileSplitter;
