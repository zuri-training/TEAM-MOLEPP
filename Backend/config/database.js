const monogoose = require('mongoose');
const {config} = require('dotenv');
const { connect } = require('http2');
config();

async function connect (uri){
    try {
        monogoose.connect(uri || process.env.MONGO_DB)
        console.log('Connected To MongoDB')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect;
