
const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')


module.exports = {
    User: sequelize.define('user', {
        id: {
            type:DataTypes.INTEGER, 
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING 
    }
    ),
}


//hashedPass can be called password but here the password will be hashed.