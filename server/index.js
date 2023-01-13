require('dotenv').config()
const {SERVER_PORT} = process.env


const express = require('express')
const cors = require('cors')



app = express()
app.use(express.json())
app.use(cors())

const{getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
// getAllPosts: (req, res) => {
// getCurrentUserPosts: (req, res) => {
// addPost: (req, res) => {
// editPost: (req, res) => {
// deletePost: (req, res) => {
 

const{register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')
    //This is using object destructuring to assign specific functions from the controller/posts variables. Makes it so you can access then without needing to use the whole module.
const { sequelize } = require ('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')

User.hasMany(Post)
Post.belongsTo(User)

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts) //gets the posts by each user by their id
app.post('/posts', isAuthenticated, addPost) //adds the post once they have been authenticated
app.put('/posts/:id', isAuthenticated, editPost) //updates an existing post by id 
app.delete('/posts/:id', isAuthenticated,  deletePost) //deletes a post by a specific idr



//sync creates a request to connect to the db using the url we specified in the database file. .then because it is async
// sequelize.sync({force: true})
     // the force true will reset the tables in the database and wipe everything out. 

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`db sync successful & server running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err, 'this is where the issue is'))
