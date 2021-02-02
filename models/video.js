
const {Schema , model} = require('mongoose')


const videoSchema = new Schema({

     name : {
          type : String,
          required : true,
     },

     video : {
          type : String,
          unique : true,
          required : true
     },

},

{
     versionKey : false
}

)

module.exports = model('Video' , videoSchema)