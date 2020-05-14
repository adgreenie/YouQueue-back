const User = require("../models/User")
const Post = require("../models/Post")
const seedData = require("./seedData.json")
const bcrypt = require("bcrypt")

async function seedDB() {
  try {
    await User.deleteMany({})
    await Post.deleteMany({})

    seedData.users.forEach((user) => {
      bcrypt.hash(user.password, 10, function (err, hash) {
        console.log("HASHED PASSWORDS", hash)
        User.create({
          username: user.username,
          password: hash,
        })
      })
    })

    seedData.posts.forEach((post) => {
      Post.create({
        sender: post.sender,
        recipient: post.recipient,
        message: post.message,
        video: post.video,
      })
    })
  } catch (err) {
    console.log("seed failed", err)
  }
}

seedDB()
