const { request, response } = require("express");
const jwt = require('jsonwebtoken')



const validateJWT = (req = request , res = response , next ) => {

     const token = req.header('x-token')

     if (!token) {
          return res.json({message : 'no token'})
     }

     try {
          const {id , name} = jwt.verify(token , process.env.JWTKEY)
          req.id = id,
          req.name = name

     } catch (error) {
          console.log(error);
          return res.json({message : 'Token no valido'})
     }

     next()
}

module.exports = {
     validateJWT
}