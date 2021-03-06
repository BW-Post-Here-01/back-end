const router = require("express").Router(); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const Users = require("../users/users-model.js"); 
const secrets = require("../api/secrets.js"); 

router.post("/register", (req, res) => {
    let user = req.body; 
    let username = user.username; 
    let email = user.email; 

    if(req.body.username){
        if(req.body.password){
            if(req.body.email){

                Users.findByUsername(username)
                .then(response => {
                    console.log('Response length: ', response.length); 
                    if(response.length){

                        res.status(500).json({ errorMessage: `Username already exists.`}); 
                    } else { 

                        Users.findByEmail(email)
                            .then(response => {
                                console.log('FindbyEmail response: ', response, response.length); 
                                if(response.length){
                                    res.status(500).json({ errorMessage: 'Email address already in use.' }); 
                                } else {

                                    const rounds = process.env.HASH_ROUNDS || 12; 
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
                                }
                            })
                            .catch(error => {
                                console.log(error); 
                            })
                    }
                })
                .catch(error => {
                    console.log('Error response to findBy: ', error); 
                }); 

            } else {
                res.status(500).json({ errorMessage: 'Please provide an email address.' }); 
            }            
        } else {
            res.status(500).json({ errorMessage: 'Please provide a password.' }); 
        }
    } else {
        res.status(500).json({ errorMessage: 'Please provide a valid username.'}); 
    } 
});

router.post("/login", (req, res) => {
    let { username, password } = req.body; 

    Users.findBy({ username })
        .then(([user]) => {
            let id = user.id; 
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user); 
                res.status(200).json({ message: "Logged in!", token, user }); 
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