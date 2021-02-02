
const {Router} = require('express')
const { check } = require('express-validator')
const { register , login } = require('../controllers/users')
const { validateCamp } = require('../middlewares/validate-camp')

const routers = Router()


routers.post('/register' ,
[
     check('name' , 'Name is required').not().isEmpty(),
     check('lastName' , 'Lastname is required').not().isEmpty(),
     check('email' , 'Email is required').not().isEmpty(),
     check('email' , 'Email is Invalid').isEmail(),
     check('password' , 'Password is required').not().isEmpty(),
     check('password' , 'Pasword must be 6 characters').isLength({min : 6}),
     validateCamp

] 
, register)

routers.post('/login' , 
[
     check('email' , 'Email is required').not().isEmpty(),
     check('email' , 'Email is Invalid').isEmail(),
     check('password' , 'Password is required').not().isEmpty(),
     validateCamp
] 
, login)

module.exports = routers