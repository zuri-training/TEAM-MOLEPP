const mongoose = require("mongoose");

//connection to mongoose
const connect = async (uri) => {
  try {
    await mongoose.connect(uri || "mongodb://localhost:27017/passport-jwt", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = connect;

// mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("error", (error) => console.log(error));
// mongoose.Promise = global.Promise;
