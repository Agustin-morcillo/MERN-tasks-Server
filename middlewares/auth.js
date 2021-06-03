const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("x-auth-token")
  
    if(!token) {
        return res.status(401).send({message:"Falta el token de autenticación"})
    }
    
    try {
        const validation = jwt.verify(token, process.env.SECRET);
        req.user = validation.user
        return next()
    } catch (error) {
        return res.status(401).send("Token no válido")
    }
}

