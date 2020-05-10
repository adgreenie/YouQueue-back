const User = require("../models/User")

const getAllUsers = (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err)
        res.send("Error loading users")
    })
}

const getUserBySN = (req, res) => {
    User.findOne({ sn: req.params.sn }).then(user => {
        res.json(user) 
    }).catch(err => {
        console.log(err)
        res.send(`Could not retrieve user "${req.params.sn}"`)
    })
}

const createUser = (req, res) => {
    User.create(req.body).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.send(`Error creating user "${req.body.sn}"...this sn may already be claimed`)
    })
}

const updateUser = (req, res) => {
    User.findOneAndUpdate({ sn: req.params.sn }, req.body)
        .then(user => {
            res.json(user)
    }).catch(err => {
        console.log(err)
        res.send("Could not update user...are you trying to change sn to one that's already claimed?")
    })
}

const deleteUser = async (req, res) => {
    User.deleteOne({ sn: req.params.sn }).then(user => {
        res.send(`The user "${user.sn}" has been deleted`)
    }).catch(err => {
        console.log(err)
        res.send(`Could not delete user with sn: "${req.params.sn}"`)
    })
}

module.exports = {
    getAllUsers,
    getUserBySN,
    createUser,
    updateUser,
    deleteUser
}