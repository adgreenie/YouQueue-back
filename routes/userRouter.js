const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.getAllUsers)

router.get("/sn/:sn", userController.getUserBySN)

router.post("/", userController.createUser)

router.put("/sn/:sn", userController.updateUser)

router.delete("/sn/:sn", userController.deleteUser)

module.exports = router