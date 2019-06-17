
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

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

  export{
      sequelize
  }