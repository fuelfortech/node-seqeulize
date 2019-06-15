import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Sequelize from 'sequelize'

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  

dotenv.config()


app.get('/',async (req,res)=>{
    let result = await sequelize.query("Select * from student")
    res.json(result[0])
})

app.post('/',async (req,res)=>{
    let result = await sequelize.query(`Insert into student values(null,'${req.body.name}','${req.body.mobile}','${req.body.address}')`)
    res.json(result)
})

app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})