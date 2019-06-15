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


app.get('/student',async (req,res)=>{
    let result = await sequelize.query("Select * from student")
    res.json(result[0])
})

app.post('/student/single',async (req,res)=>{
  let result = await sequelize.query(`Select * from student where id=${req.body.id}`)
  res.json(result[0])
})

app.post('/student/search',async (req,res)=>{
  let result = await sequelize.query(`Select * from student where name like '%${req.body.name}%'`)
  res.json(result[0])
})
app.post('/student',async (req,res)=>{
    let result = await sequelize.query(`Insert into student values(null,'${req.body.name}','${req.body.mobile}','${req.body.address}')`)
    res.json(result)
})

app.delete('/student',async (req,res)=>{
  let result = await sequelize.query(`Delete from student where id=${req.body.id}`)
  res.json(result)
})

app.put('/student',async (req,res)=>{
  let result = await sequelize.query(`Update student set name='${req.body.name}',mobile='${req.body.mobile}',address='${req.body.address}' where id=${req.body.id}`)
  res.json(result)
})



app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})