const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/auth")

router.get("/", auth , validator.queryProjectAccess, tasksController.taskList)

router.post("/create", auth , validator.bodyProjectAccess , validator.createTask , tasksController.createTask)

router.put("/edit/:id", auth , validator.bodyProjectAccess, validator.taskExist, validator.editTask , tasksController.editTask)

router.delete("/delete/:id", auth, validator.queryProjectAccess ,validator.taskExist, tasksController.deleteTask)

module.exports = router;

