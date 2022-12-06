const monogoose = require('mongoose');
const {config} = require('dotenv');
config();

const connect = async() =>{
    try {
        await monogoose.connect(process.env.MONGO_DB)
        console.log('Connected To MongoDB')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect;
