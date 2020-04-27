//const router = require("express").Router(); 
const express = require('express');
const router = express.Router();


const Posts = require("./posts-model.js"); 

router.post('/', (req, res) => {
    let post = req.body; 

    Posts.add(post)
        .then(response => {
            console.log(response); 
            res.status(201).json({ message: response }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
}); 

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

router.put('/:id', (req, res) => {
    let id = req.params.id; 
    let post = req.body; 

    Posts.update(id, post)
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

    Posts.remove(id)
        .then(response => {
            console.log(response); 
            res.status(200).json({ message: `Post Id#${id} was successfully deleted!` }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        }); 
}); 

module.exports = router; 