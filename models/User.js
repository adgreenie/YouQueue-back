const mongoose = require("../db/connection")
mongoose.set("useCreateIndex", true)
const Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  username_lower: { type: String, default: this.username.toLower() },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dnj7porin/image/upload/v1587728631/default-user-icon_ugojoc.png",
  },
})

UserSchema.plugin(uniqueValidator)

const User = mongoose.model("User", UserSchema)
module.exports = User
