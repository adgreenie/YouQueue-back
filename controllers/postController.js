const Post = require("../models/Post")

const getAllPosts = (req, res) => {
    Post.find({}).then(posts => {
        res.json(posts)
    }).catch(err => {
        console.log(err)
        res.send("Error loading posts")
    })
}

const getPostsByRecipient = (req, res) => {
    Post.find({ sn: req.params.sn }).then(posts => {
        res.json(posts)
    }).catch(err => {
        console.log(err)
        res.send(`Error loading posts by "${req.params.sn}"`)
    })
}

const getPostByID = (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {
        res.json(post)
    }).catch(err => {
        console.log(err)
        res.send(`Error loading post with ID: "${req.params.id}"`)
    })
}

const createPost = (req, res) => {
    Post.create(req.body).then(post => {
        res.json(post)
    }).catch(err => {
        console.log(err)
        res.send("Error creating post")
    })
}

const updatePost = (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(post => {
            res.json(post)
    }).catch(err => {
        console.log(err)
        res.send(`Could not update post with ID: "${req.params.id}"`)
    })
}

const deletePost = async (req, res) => {
    Post.deleteOne({ _id: req.params.id }).then(post => {
        res.send(`${post.sn}'s post "${post.body}" has been deleted`)
    }).catch(err => {
        console.log(err)
        res.send(`Could not delete post with ID: "${req.params.id}"`)
    })
}

module.exports = {
    getAllPosts,
    getPostsByRecipient,
    getPostByID,
    createPost,
    updatePost,
    deletePost
}