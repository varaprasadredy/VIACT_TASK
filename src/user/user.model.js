//Import Modules or Paths
import Sequelize from 'sequelize'
import sequelize from "../../utility/rds.sequelize.js"
//Create a Schema
const UserSchema = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unqiue: true
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    }
});
//Export user schema
export default UserSchema;