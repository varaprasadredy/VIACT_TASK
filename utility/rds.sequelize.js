//Import Modules or Paths 
import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
//sequelize connection setup for mariadb
const sequelize = new Sequelize(process.env.DB_NAME || 'User', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 3,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
});
// Sequelize Sync
sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .catch(error => {
    console.log("Error is................", error)
  })
//Export sequelize connection                        
export default sequelize;