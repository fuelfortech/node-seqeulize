import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import routes from './routes'

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use('/student',routes.student)
app.use('/school',routes.school)

  

dotenv.config()



app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})