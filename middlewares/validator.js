const {body, param, query} = require("express-validator");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");

const validator = {
    createUser: [
        body("name")
            .notEmpty()
            .withMessage("Debes ingresar un nombre"),
        body("email")
            .notEmpty()
            .withMessage("Debes ingresar un email")
            .bail()
            .isEmail()
            .withMessage("El email ingresado debe ser válido")
            .bail()
            .custom(async function(value) {
                const user = await User.findOne({email: value})
                if(user) {
                    return Promise.reject("El email ingresado ya se encuentra en uso");
                }    
            }),
        body("password")
            .notEmpty()
            .withMessage("Debes ingresar un password")
            .bail()
            .isLength({min:6})
            .withMessage("El password debe tener al menos 6 caracteres")
    ],
    login: [
        body("email")
            .notEmpty()
            .withMessage("Debes ingresar un email")
            .bail()
            .isEmail()
            .withMessage("El email ingresado debe ser válido")
            .bail()
            .custom(async function(value, { req }) {
                const user = await User.findOne({email:value})
                if(!user || !bcrypt.compareSync(req.body.password, user.password)) {                 
                    return Promise.reject("Email o contraseña inválidos");
                }
            }),
        body("password")
            .notEmpty()
            .withMessage("Debes ingresar un password")
    ],
    bodyProjectAccess: [
        body("projectId")
            .notEmpty()
            .withMessage("Debes ingresar el Id del proyecto")
            .bail()
            .custom(async function(value, { req }) {
                try {
                    const project = await Project.findById(value)
                    if(project.owner.toString() !== req.user) {
                        return Promise.reject("No puedes acceder a este proyecto")
                    }
                } catch (error) {
                    return Promise.reject("Proyecto no encontrado")
                }
            })
    ],
    paramProjectAccess: [
        param("id")
            .notEmpty()
            .withMessage("Debes pasar un parámetro")
            .bail()
            .custom(async function(value, { req }) {
                try {
                    const project = await Project.findById(value)
                    if(project.owner.toString() !== req.user) {
                        return Promise.reject("No puedes acceder a este proyecto")
                    }
                } catch (error) {
                    return Promise.reject("Proyecto no encontrado")
                }
            })
    ],
    queryProjectAccess: [
        query("projectId")
            .notEmpty()
            .withMessage("Debes ingresar el Id del proyecto")
            .bail()
            .custom(async function(value, { req }) {
                try {
                    const project = await Project.findById(value)
                    if(project.owner.toString() !== req.user) {
                        return Promise.reject("No puedes acceder a este proyecto")
                    }
                } catch (error) {
                    return Promise.reject("Proyecto no encontrado")
                }
            })
    ],
    createProject: [
        body("name")
            .notEmpty()
            .withMessage("Debes ingresar un nombre de proyecto")
    ],
    editProject: [
        body("name")
            .notEmpty()
            .withMessage("Debes ingresar un nombre de proyecto")
    ],
    taskExist: [
        param("id")
            .custom(async function(value) {
                try {
                    const task = await Task.findById(value)
                    if(!task) {
                        return Promise.reject("Tarea no encontrada")
                    }
                } catch (error) {
                    return Promise.reject("Tarea no encontrada")
                }
            })
    ],
    createTask: [
        body("name")
            .notEmpty()
            .withMessage("Debes ingresar un nombre de tarea"),
    ],
    editTask: [
        body("state")
            .isBoolean()
            .withMessage("El estado debe ser un booleano")
    ],
}
module.exports = validator;

