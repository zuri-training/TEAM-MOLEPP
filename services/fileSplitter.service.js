const fs = require("fs");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");
const multer = require("multer");

const bodyParser = require("body-parser");

const fileSplitter = async (req, res, next) => {
  //get extension name, file content, size

  const { size, file } = req.body;
  console.log("REQ BODYYYYY", req.body);
  console.log("REQ BODYYYYY", JSON.stringify(req.body));

  async function createList() {
    const processedJson = [];
    const csvToJsonParsing = new Promise(function (resolve, reject) {
      // fs.createReadStream("100000 Sales Records.csv")
      //   console.log("createlist here");
      //   console.log("file here", file);
      //   fs.createReadStream(file)
      fs.createReadStream("data.json")
        .pipe(csv({ separator: "," }))
        .on("data", (data) => {
          processedJson.push(data);
        })
        .on("end", () => {
          resolve();
        });
      //   console.log("find thy error");
    });

    // console.log("createlist here 2");

    await csvToJsonParsing;
    // console.log("createlist here 4", processedJson);

    return processedJson;
  }

  async function fileSplitter(processedJson) {
    console.log("Splitting original file...");
    let startingPoint = 0;
    let linesWritten = 0;
    // let Chunkedfiles = [];
    // const chunkSize = 5000;
    const chunkSize = Number(size) || 10;
    console.log(processedJson.length);

    // if (processedJson.length <= chunkSize) {
    //   Chunkedfiles.push(processedJson);
    //   return;
    // }

    // this reprenents the number of files the original file will be broken into
    numChunks = Math.ceil(processedJson.length / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      if (linesWritten >= processedJson.length) {
        break;
      }

      // the data that will get written into the current smaller file
      let jsonChunk = [];

      for (let j = startingPoint; j < startingPoint + chunkSize; j++) {
        jsonChunk.push(processedJson[j]);

        if (j < processedJson.length) {
          linesWritten++;
          // if we've reached the chunk increment, increase the starting point to the next increment
          if (
            j == startingPoint + chunkSize - 1 ||
            linesWritten + 1 >= processedJson.length
          ) {
            Chunkedfiles.push(
              jsonChunk.slice(startingPoint, startingPoint + chunkSize)
            );
            startingPoint = j + 1;

            // file chunk to be written
            const writeStream = await fs.createWriteStream(
              "file-" + i + ".csv"
            );
            const options = { headers: true };
            const generateCsv = fastcsv.write(jsonChunk, options);
            generateCsv.pipe(writeStream);
            const jsonToCsv = new Promise(function (resolve, reject) {
              generateCsv
                .on("error", function (err) {
                  reject(err);
                })
                .on("end", function () {
                  resolve();
                });
            });
            await jsonToCsv;
            // console.log("jsonChunk", jsonChunk);
            break;
          }
        }
      }
    }
    console.log("File split complete ...");
  }

  async function driver() {
    console.log("**** FILE SPLITTER ****");

    // get JSON Array of all lines in original file
    const fileLines = await createList();

    // split into multiple smaller files with original list of lines
    await fileSplitter(fileLines);

    console.log("**** FILE SPLITTER COMPLETE ****");
  }

  driver();

  res.json({
    message: "Successfully Splitted!",
    user: "You",
  });
};

module.exports = fileSplitter;
