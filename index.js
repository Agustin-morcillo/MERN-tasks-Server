const express = require("express");
const cors = require('cors')

/* Server */
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

/* Configurations */
require("dotenv").config();
app.use(express.json());
app.use(cors());

/* Required routes */
const dbConection = require("./config/db");
const apiUsersRouter = require("./routes/users")
const apiProjectsRouter = require("./routes/projects")
const apiTasksRouter = require("./routes/tasks")

/* DB Conection */
dbConection();

/* Routes */
app.use("/api/users", apiUsersRouter)
app.use("/api/projects", apiProjectsRouter)
app.use("/api/tasks", apiTasksRouter)

app.use("/", function(req, res) {
    return res.send("Back-end de la aplicación") 
})

