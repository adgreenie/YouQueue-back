const User = require("../models/User")
const Post = require("../models/Post")

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.log(err)
      res.send("Error loading users")
    })
}

const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.send(`Could not retrieve user "${req.params.username}"`)
    })
}

const getUsernameExists = (req, res) => {
  User.exists({ username: new RegExp("^" + req.params.username + "$", "i") })
    .then((exists) => {
      res.json(exists)
    })
    .catch((err) => {
      console.log(err)
      res.send(`Error checking if user "${req.params.username}" exists`)
    })
}

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.send(
        `Error creating user "${req.body.username}"...this username may already be claimed`
      )
    })
}

const updateUser = (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.send(
        "Could not update user...are you trying to change username to one that's already claimed?"
      )
    })
}

const deleteUser = async (req, res) => {
  User.deleteOne({ username: req.params.username })
    .then((user) => {
      Post.deleteMany({
        $or: [{ sender: user.username }, { recipient: user.username }],
      })
      res.send(`The user "${user.username}" has been deleted`)
    })
    .catch((err) => {
      console.log(err)
      res.send(`Could not delete user with username: "${req.params.username}"`)
    })
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUsernameExists,
  createUser,
  updateUser,
  deleteUser,
}
