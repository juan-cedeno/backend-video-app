const { request, response } = require("express");
const bcrypt = require('bcrypt')
const User = require("../models/user");
const {generateJwt} = require('../helpers/generateJwt')

const register = async (req = request, res = response) => {
  try {
    const { email , password} = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "Email alredy used",
      });
    }

    user = new User(req.body)
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password , salt)

    const token =  await generateJwt(user.id , user.name)
    
    await user.save()

    res.json({
         id : user.id,
         name : user.name,
         token
    })

  } catch (error) {
       console.log(error);
       return res.json({message : 'Comunicarse con soporte tecnico'})
  }
};

const login = async (req = request , res = response) => {
     try {
          const {email , password} = req.body

          let user = await User.findOne({email})

          
          if (!user) {
               return res.json({message : 'Email or password incorrect'})
          }
          
          const validatePassword = bcrypt.compareSync(password , user.password)
          
          if (!validatePassword) {
               return res.json({messaje : 'Email or password incorrect'})
          }

          const token = await generateJwt(user.id , user.name)
          
          res.json({
               id : user.id,
               name : user.name,
               token
          })
     } catch (error) {
          console.log(error);
          return res.json({message : 'Comunicarse con soporte tecnico'})
     }
}

module.exports = {
  register,
  login
};
