const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
    text: {
        type: String,
        required: true 
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Comment', commentSchema)