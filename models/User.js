const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSChema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    passsword: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('User', userSChema)