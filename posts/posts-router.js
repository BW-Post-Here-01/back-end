const router = require("express").Router(); 

const db = require("../database/dbConfig.js"); 

router.get("/", (req, res) => {
    return db("posts"); 
})

module.exports = router; 