const router = require("express").Router(); 

const Posts = require("./posts-model.js"); 

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            console.log(posts); 
            res.status(200).json({ posts }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
})

module.exports = router; 