const express = require("express");
const router = express.Router();

const projectsController = require("../controllers/projectsController")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/auth")

router.get("/", auth , projectsController.projectList) 

router.post("/create", auth , validator.createProject, projectsController.createProject)

router.put("/edit/:id", auth , validator.paramProjectAccess , validator.editProject , projectsController.editProject)

router.delete("/delete/:id", auth, validator.paramProjectAccess ,projectsController.deleteProject)

module.exports = router;

