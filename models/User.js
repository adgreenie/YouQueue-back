const mongoose = require('../db/connection')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    sn: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/dnj7porin/image/upload/v1587728631/default-user-icon_ugojoc.png'
    },
    bio: String,
    friends: [String],
    favorites: [
        {
            ref: "Post",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
})

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema)
module.exports = User