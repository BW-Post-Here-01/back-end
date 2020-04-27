const express = require("express"); 
const cors = require("cors"); 
const helmet = require("helmet"); 

const authRouter = require("../auth/auth-router.js"); 
const postsRouter = require("../posts/posts-router.js"); 
const usersRouter = require('../users/users-router.js'); 
const authenticator = require("../auth/authenticator.js"); 

const server = express(); 

server.use(express.json()); 
server.use(cors()); 
server.use(helmet()); 

server.use('/api/auth', authRouter); 
server.use('/api/posts', authenticator, postsRouter); 
server.use('/api/users', authenticator, usersRouter); 

server.get("/", (req, res) => {
    console.log(`Welcome to Post Here Subreddit App!`); 
    res.status(200).json({ message: `Welcome to Post Here Subreddit App!`}); 
})

module.exports = server; 