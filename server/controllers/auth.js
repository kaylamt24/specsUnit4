require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//JWT is used to securly transmit information between parties. 

const createToken = (username, id) => {
    return jwt.sign(
    {
        username,
        id
    },
    SECRET,
    {
        expiresIn: '2 days'
    }
)
}


module.exports = {

    logout: (req, res) => {
        console.log('logout')
    },

    //async because it takes time to complete. 
    register: async (req, res) => {
        console.log(`Hello, it's ready`)
            try {
              // Destructure username and password from req.body
              const {username, password} = req.body
              // Check if user exists. await waits for the findOne method to complete before continuing the code. findOne is used when working with dbs. It is used here to search for a specific username. It takes in a method as an argument that defines the search criteria. 
              let foundUser = await User.findOne({where: {username: username}})
              // if findOne username is true, it will return a 400 error with am essage. 
              if (foundUser) {
                res.status(400).send('Username is not available')
                //if findOne username is false, this is where the salt/hash begins on the user information. 
              } else {
                // Create salt - Function generates a new salt that can be used to has a password. The 10 is the level of security. It is recommended to use 10 but you can increase it. When it increases, it increases the security level but it increases the time it takes to hash the password, but does make it more secure. 
                const salt = bcrypt.genSaltSync(10);
                // Create hashed bcrypt - takes in a password and a salt and returns a hashed password. Password is the password that the user creates. Salt is a generated random string that is added to the password before hashing to make the hashed password unique. 
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({username, hashedPass: hash})
                console.log('new user', newUser)

                //createToken is used to create a JWT. takes in the new users username and id and using them to create a JWT that can be used to authenticate the user. 
                //dataValues is used by Sequelize and is commonly used when working with dbs'. Property of instances returned by ORM that contain field values of the instance in the form of an object. 
         
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                console.log('token', token)
                //Date.now() is a method that returns the number of milliseconds(ms). (1000) is 1 second in ms, (60) is the number of seconds in a minute, (60) number of minutes in an hour and (48) is the number of hours. You can change the 48 to the length of time the expiration date is. In this case it is 2 days but you can increase and decrease. 
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
                }
    }
    catch (error) {
        console.log(error, "error")
        res.status(400)
}
},

login: async (req, res) => {
    try {
        const {username, password} = req.body
        const foundUser = await User.findOne({where: {username : username}})
        
        if(foundUser){
            console.log(foundUser, 'first if')
            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

        if (isAuthenticated){
            const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
            const exp = Date.now() + 1000 * 60 * 60 * 48
            res.status(200).send({
                username: foundUser.dataValues.username,
                userId: foundUser.dataValues.id,
                token,
                exp
            })
        } else {
            res.status(400).send('Password incorrect')
        }
        } else {
            res.status(400).send('No user with that name')
        }
    }     catch (error) {
        console.log(error, "error")
        res.status(400)
}
}
}


