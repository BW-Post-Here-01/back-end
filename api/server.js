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

module.exports = server; 