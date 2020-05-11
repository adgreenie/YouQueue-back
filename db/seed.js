const User = require('../models/User')
const Post = require('../models/Post')
const seedData = require('./seedData.json')

async function seedDB() {
    try {
        await User.deleteMany({})
        await Post.deleteMany({})

        seedData.users.forEach(user => {
            User.create({
                sn: user.sn,
                bio: user.bio,
                friends: user.friends
            })
        })

        seedData.posts.forEach(post => {
            Post.create({
                sender: post.sender,
                recipient: post.recipient,
                message: post.message,
                video: post.video
            })
        })
    }
    catch (err) {
        console.log('seed failed', err)
    }
}

seedDB()
