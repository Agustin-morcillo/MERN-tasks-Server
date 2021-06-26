const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

const usersController = {
  createUser: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      const user = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
      })
      await user.save()

      /* JSON Web Token */
      jwt.sign(
        { user: user.id },
        process.env.SECRET,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) {
            throw error
          }
          return res.send({
            status: 200,
            msg: `Usuario ${name} creado correctamente`,
            token: `${token}`,
          })
        }
      )
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
  login: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    try {
      const user = await User.findOne({ email: req.body.email })

      /* JSON Web Token */
      jwt.sign(
        { user: user.id },
        process.env.SECRET,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) {
            throw error
          }
          return res.send({
            status: 200,
            msg: "Has iniciado sesión de forma satisfactoria",
            token: `${token}`,
          })
        }
      )
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
  getAuthUser: async (req, res) => {
    try {
      const user = await User.findById(req.user).select("-password")
      return res.send(user)
    } catch (error) {
      console.log(error)
      return res.status(500).send("Hubo un error")
    }
  },
}

module.exports = usersController
