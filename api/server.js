const express = require("express"); 
const server = express(); 
const cors = require("cors"); 
const helmet = require("helmet"); 

const authRouter = require("../auth/auth-router.js"); 
const authenticator = require("../auth/authenticator.js"); 

server.use(express.json()); 
server.use(cors()); 
server.use(helmet()); 

server.use("/api/auth", authRouter); 
//server.use("/api/posts", authenticator, postsRouter); 

server.get("/", (req, res) => {
    console.log(`Welcome to Post Here Subreddit App!`); 
    res.status(200).json({ message: `Welcome to Post Here Subreddit App!`}); 
})


module.exports = server; 