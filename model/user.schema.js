const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { fileSchema } = require("./file.schema");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    files: [fileSchema],
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(this.password, 10);

//   this.password = hash;
//   next();
// });

// userSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// };

const userModel = model("userModel", userSchema);
module.exports = userModel;
// module.exports = userSchema;
