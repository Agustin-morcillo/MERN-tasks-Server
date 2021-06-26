const Task = require("../models/Task")
const { validationResult } = require("express-validator")

const tasksController = {
  createTask: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    try {
      const task = new Task({
        name: req.body.name,
        projectId: req.body.projectId,
      })
      await task.save()

      return res.send({
        status: 200,
        msg: "Tarea creada con éxito",
        details: task,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
  taskList: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    try {
      const tasks = await Task.find({ projectId: req.query.projectId })
      if (tasks.length < 1) {
        return res.send({
          status: 404,
          msg: "No hay tareas en el proyecto",
          taskList: tasks,
        })
      }
      return res.send({
        status: 200,
        msg: "Lista de tareas del proyecto",
        taskList: tasks,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
  editTask: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { name, state } = req.body

    try {
      let currentTask = await Task.findById(req.params.id)

      currentTask = {
        name: name,
        state: state,
      }

      const editedTask = await Task.findOneAndUpdate(
        { _id: req.params.id },
        currentTask,
        { new: true }
      )

      return res.send({
        status: 200,
        msg: "Tarea modificada exitosamente",
        details: editedTask,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
  deleteTask: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    try {
      const task = await Task.findById(req.params.id)
      if (task.projectId.toString() !== req.query.projectId.toString()) {
        return res.status(401).send({
          status: 401,
          msg: "No puedes eliminar esa tarea",
        })
      }
      await Task.findOneAndRemove({ _id: req.params.id })

      return res.send({
        status: 200,
        msg: "Tarea eliminada exitosamente",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
}

module.exports = tasksController
