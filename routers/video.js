const {Router} = require('express')
const { check } = require('express-validator')
const {postVideos , getVideos, getVideoById, editVideo , deleteVideo} = require('../controllers/video')
const {validateCamp} = require('../middlewares/validate-camp')
const { validateJWT } = require('../middlewares/validateJWT')

const routers = Router()

routers.use(validateJWT)

routers.post('/video',
[
     check('name' , 'Video name is required').not().isEmpty(),
     check('video' , 'Video url is required').not().isEmpty(),
     validateCamp,
]
 , postVideos)

routers.get('/video' , getVideos)
routers.get('/video/:id' , getVideoById)
routers.put('/video/:id' , editVideo)
routers.delete('/video/:id' , deleteVideo)

module.exports = routers