const express = require('express')
const { connectDatabase } = require('./db/config')
require("dotenv").config()
const cors = require('cors')



const app = express()
app.use(express.json())
app.use(cors())
connectDatabase()

app.use('/api/' , require('./routers/user'))
app.use('/api/' , require('./routers/video'))


app.listen( process.env.PORT ,() => {
     console.log('2020')
})