const mongoose = require("mongoose")

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log("¡Base de datos conectada con éxito!")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
module.exports = dbConection
