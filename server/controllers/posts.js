require('dotenv').config()
const {SECRET} = process.env
const {User} = require('../models/user')
const {Post} = require('../models/post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




module.exports = {


    
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                //the findAll method is from the Post model and it is retreiving all posts from the db where the private status is false and includes the username. If privateStatus is true, it will not pull those posts. 
                where: {privateStatus: false},
                //where filters the results from the query of the db
                include: [{
                    //include only includes post that are public
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts) // if A-OK, it is going to send the posts that it found. 
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        try {
            const {userId} = req.params
            //req.params is being used because it is being passed as a parameter in the URL path so it has to be extracted. The route is '/userposts/user:Id'.
            const posts = await Post.findAll({
                where: {userId : userId},
                //you can just put userId but I am leaving it like this so that I know that userId = userId. 
                include: [{
                    model: User,
                    required: true,
                    attributes: ['username']
                }]
            })
            res.status(200).send(posts)
        }catch (error){
            console.log(error, 'Error in getCurrentUserPosts')
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        try {
            console.log(req.body)
            const {title, content, status, userId} = req.body
            await Post.create({title, content, privateStatus: status, userId})   
            res.sendStatus(200)
        } catch (error) {
            console.log(error, "error")
            res.sendStatus(400)
        }
    },

    editPost: async (req, res) => {
        try {
            const {id} = req.params //part of the URL path
            const {status} = req.body // part of form submussion
            await Post.update({privateStatus: status}, {
                where: {id: + id} 
                //id is a primary key in the db and is used to uniquely identify the post. When you add the + id it converts the string value of id to a number. The id column in the db is an integer and so it has to be converted to the correct type before being passed as a query parameter. 
            })
            res.sendStatus(200)
        }
        catch (error){
            console.log(error, 'Error in editPost')
            res.sendStatus(400)

        }
    },

    deletePost: async (req, res) => {
        try {
            const {id} = req.params //only need the id because we are deleting it based on that id (primary key). 
            await Post.destroy({where: {id: +id}})
            //destroy is the method that deletes record(s) based on meeting the specific requirements. Removes the entire row(s) from the table that matches the specific condition. This CANNOT be undone so be VERY careful of how you execute this. 
            res.sendStatus(200)
            
        }
        catch (error) {
            console.log(error, 'error at deletePost')
            res.sendStatus(400)
        }
    }
}
