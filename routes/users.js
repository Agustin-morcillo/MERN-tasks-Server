const express = require("express")
const router = express.Router()

const usersController = require("../controllers/usersController")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/auth")

router.get("/", auth, usersController.getAuthUser)

router.post("/register", validator.createUser, usersController.createUser)

router.post("/login", validator.login, usersController.login)

module.exports = router
