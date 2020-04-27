const express = require('express'); 
const router = express.Router(); 

const Users = require('./users-model.js'); 

router.put('/:id', (req, res) => {
    let user = req.body; 
    let id = req.params.id; 

    Users.update(id, user)
        .then(response => {
            console.log(response); 
            res.status(200).json({ response }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
}); 

router.delete('/:id', (req, res) => {
    let id = req.params.id; 
    
    Users.remove(id)
        .then(response => {
            console.log(response); 
            res.status(200).json({ response: `User ID#${id} successfully deleted!` }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
})

module.exports = router; 