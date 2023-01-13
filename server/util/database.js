require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    sequelize
}

//This is setting up a connection to a Postgres DB using the Sequelize library. It is loading environment variables from the .env file and using them to connect to the DB created in bit.io. Also sets up a SSL support and rejects unauthorized connections. 

//module.exports is so it can be exported and used in other parts of the app.

//SSL is a security protocol that is used to make sure data transmission is safe between computers. Provides encryption for data so it cannot be intercepted by 3rd parties and also provides authentication. 