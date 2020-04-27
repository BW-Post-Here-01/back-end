const router = require("express").Router(); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const Users = require("../users/users-model.js"); 
const secrets = require("../api/secrets.js"); 

router.post("/register", (req, res) => {
    let user = req.body; 

    const rounds = process.env.HASH_ROUNDS || 20; 
    const hash = bcrypt.hashSync(user.password, rounds); 

    user.password = hash; 

    Users.add(user)
        .then(response => {
            console.log(response); 
            res.status(201).json({ response }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
});

router.post("/login", (req, res) => {
    let { username, password } = req.body; 

    Users.findById(username)
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(); 
                res.status(200).json({ message: "Logged in!", token }); 
            } else { 
                res.status(401).json({ message: "Incorrect password!" }); 
            } 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
}); 

function generateToken(user){
    const payload = {
        userId: user.id, 
        username: user.username, 
    }
    const secret = secrets.jwtSecret; 

    const options = {
        expiresIn: "1d", 
    }; 

    return jwt.sign(payload, secret, options); 
}
































module.exports = router; 