const Project = require("../models/Project");
const {validationResult} = require ("express-validator");

const projectsController = {
    createProject: async (req,res) => {

        const errors = validationResult(req);        
        if(!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()})
        }
        
        try {
            const project = new Project({
                name: req.body.name,
                owner: req.user
            })
            await project.save()   
            
            return res.send({
                status: 200,
                msg: "Proyecto creado exitosamente",
                details: project
            })  
        } catch (error) {
            console.log(error)
            return res.status(500).send("Hubo un error")
        }
    },
    projectList: async (req, res) => {

        try {
            const projects = await Project.find({owner: req.user})
            if(projects.length < 1) {
                return res.send({
                    status: 404,
                    msg: "No tienes ningún proyecto creado",
                    projectList: projects
                })
            }

            return res.send({
                status: 200,  
                msg: "Lista de proyectos del usuario logeado",
                projectList: projects
            })    
        } catch (error) {
            console.log(error)
            return res.status(500).send("Hubo un error") 
        }
    },
    editProject: async (req, res) => {

        const errors = validationResult(req);        
        if(!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()})
        }

        try {
            let project = await Project.findById(req.params.id)
            project.name = req.body.name
            
            const editedProject = await Project.findByIdAndUpdate({_id: req.params.id}, {
               $set: project}, {new: true})
    
            return res.send({
                status: 200,
                msg: "Proyecto modificado exitosamente",
                details: editedProject
            })
        } catch (error) {
            console.log(error) 
            return res.status(500).send("Hubo un error")
        }
    },
    deleteProject: async (req, res) => {

        const errors = validationResult(req);        
        if(!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()})
        }

        try {
            await Project.findOneAndDelete({_id: req.params.id})
            return res.send({
                status: 200,
                msg: "Proyecto elimiando con éxito"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send("Hubo un error")
        }
    }
}
module.exports = projectsController