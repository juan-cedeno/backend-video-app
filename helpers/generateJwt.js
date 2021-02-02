const jwt = require('jsonwebtoken')

const generateJwt = (id , name) => {

     const payload = {id , name}
     
     try {
         return new Promise ((resolve , reject) => {
               jwt.sign(payload , process.env.JWTKEY , {
                    expiresIn : '24h'
               }, (error , token) => {
                    if (error) {
                         console.log(error);
                         reject(error)
                    }

                    resolve(token)
               })
          })
     } catch (error) {
          console.log(error);
     }

}
module.exports = {
     generateJwt
}