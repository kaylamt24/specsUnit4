require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

//module.exports tells Node which parts of the code to export from the given file so that other files are allowed to access the exported code. Do it by "requiring"

//code sets up authentication middleware to determine if a user is authenticated or not. 

module.exports = {
    isAuthenticated: (req, res, next) => {
        
        //req = request - This represents the incoming HTTP request from the user.
        //res = respond - This stores the response that will be sent back to the user after the request is processed. 
        //next - This will be called when the request has been processed letting hte app know that the middleware is finished and can move on to the next step. 

        const headerToken = req.get('Authorization')
        //retrieves the JSON webtoken and it has to be there for the authentication to succeed. Has to be right. Receiving it from the front end


        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
           //401 means the request has been denied. If it is not (!) the right headerToken, they will receive a this code letting them know their webtoken does not work/they are not authenticated. 
        }

        let token
        //variable which stores the JSON webtoken that has been passed in by the user. If hte token is valid, it will be stored in the variable. 

        try {
            // '"try" is used to define a block of code that will be attemped and if an error occurs, the code with the catch will be executed. 

            token = jwt.verify(headerToken, SECRET)
            //this validates the JSON web token that the user gave. That webtoken is what is used to authenticate the user and determine if they are allowed to login/have access.

        } catch (err) {
            err.statusCode = 500
            throw err
            //statusCode = 500 is the server-side status code used to indicate an error has happened while attempting to authenticate the user. 
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
        //let the application know that the middleware is finished processing the requet and can move on to the next step. This function is called at the end to indicate authentication was successful and they can proceed. 
    }
}