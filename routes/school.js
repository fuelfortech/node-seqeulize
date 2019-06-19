import { Router } from "express";
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
const router = Router();


router.get('/',async (req,res)=>{
    let result = await sequelize.query("Select * from school")
    res.json(result[0])
})

router.post('/single',async (req,res)=>{
  let result = await sequelize.query(`Select * from school where id=${req.body.id}`)
  res.json(result[0])
})

router.post('/signin',async (req,res)=>{
  let result = await sequelize.query(`Select password from school where email='${req.body.username}' OR mobile='${req.body.username}'`)
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

router.post('/search',async (req,res)=>{
  let result = await sequelize.query(`Select * from school where name like '%${req.body.name}%'`)
  res.json(result[0])
})
router.post('/register',async (req,res)=>{
  console.log(process.env.SALTROUNDS)
  bcrypt.hash(req.body.password, parseInt(process.env.SALTROUNDS), async function(err, hash) {
    if(err){
      res.send(err)
      console.log(err)
      return
    }
    let result = await sequelize.query(`Insert into school values(null,'${req.body.name}','${req.body.mobile}','${req.body.email}','${hash}','${req.body.address}')`)
    res.json(result)
  });
    
})

router.delete('/',async (req,res)=>{
  let result = await sequelize.query(`Delete from school where id=${req.body.id}`)
  res.json(result)
})

router.put('/',async (req,res)=>{
  let result = await sequelize.query(`Update school set name='${req.body.name}',mobile='${req.body.mobile}',address='${req.body.address}' where id=${req.body.id}`)
  res.json(result)
})

export default router