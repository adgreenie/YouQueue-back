const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")

router.get("/", postController.getAllPosts)

router.get("/sn/:sn", postController.getPostsByRecipient)

router.get("/id/:id", postController.getPostByID)

router.post("/", postController.createPost)

router.put("/id/:id", postController.updatePost)

router.delete("/id/:id", postController.deletePost)

module.exports = router