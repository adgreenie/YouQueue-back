const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    sender: String,
    recipient: String,
    date: { type: String, default: Date() },
    message: String,
    video: String
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post