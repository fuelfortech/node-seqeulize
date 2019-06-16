import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

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

app.post('/student/signin',async (req,res)=>{
  let result = await sequelize.query(`Select password from student where email='${req.body.username}' OR mobile='${req.body.username}'`)
  if(result[0].length==0){
    res.send("username is invalid!")
  }
  else{
    let hash = result[0][0]['password']
    bcrypt.compare(req.body.password, hash, async function(err, response) {
      res.json(response)
    });
  }
  

  
})

app.post('/student/search',async (req,res)=>{
  let result = await sequelize.query(`Select * from student where name like '%${req.body.name}%'`)
  res.json(result[0])
})
app.post('/student/register',async (req,res)=>{
  console.log(process.env.SALTROUNDS)
  bcrypt.hash(req.body.password, parseInt(process.env.SALTROUNDS), async function(err, hash) {
    if(err){
      res.send(err)
      console.log(err)
      return
    }
    let result = await sequelize.query(`Insert into student values(null,'${req.body.name}','${req.body.mobile}','${req.body.email}','${hash}','${req.body.address}')`)
    res.json(result)
  });
    
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