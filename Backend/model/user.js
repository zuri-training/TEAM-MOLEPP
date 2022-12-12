const {Schema, model} = require('mongoose');

const userSchema = new Schema({
      username:{
        type: String,
        require: true
      },

      email:{
        type: String,
        require: true,
        unique: true
      },

      password:{
        type: String,
        require: true
      }
}, {timeStamps: true});

const userModel = model('users', userSchema);

module.exports = userModel;