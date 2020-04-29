const express = require('express'); 
const router = express.Router(); 

const Users = require('./users-model.js'); 
const Posts = require("../posts/posts-model.js"); 

router.get('/:id', (req, res) => {
    let id = req.params.id; 
    
    Users.findById(id)
        .then(response => {
            console.log(response); 
            res.status(200).json({ response }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
})

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

// POSTS

router.get('/:id/posts', (req, res) => {
    let id = req.params.id; 
    
    Posts.findByUserId(id)
        .then(results => {
            console.log(results); 
            res.status(200).json({ results }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
})

router.get('/:id/posts/:post_id/', (req, res) => {
    let id = req.params.id; 
    let post_id = req.params.post_id; 

    Posts.findByPostId(post_id)
        .then(response => {
            console.log(response); 
            res.status(200).json({ response }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ error }); 
        })
})

router.post('/:id/posts', (req, res) => {
    let post = req.body; 
    let id = req.params.id; 
    post.user_id = id; 

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

router.put('/:id/posts/:post_id', (req, res) => {
    let id = req.params.id;
    let post_id = req.params.post_id;  
    let post = req.body; 

    console.log(post_id, id, typeof post_id); 
    
    Posts.findByPostId(post_id)
        .then(response => {
            console.log("This is the response length: ", response.length); 
            if(response.length){
                console.log(post); 
                Posts.update(post_id, post)
                .then(response => {
                    console.log('Response: ', response); 
                    res.status(200).json({ response }); 
                })
                .catch(error => {
                    console.log(error); 
                    res.status(500).json({ errorMessage: error.message }); 
                })
            } else {
                res.status(404).json({ errorMessage: "Post does not exist!" }); 
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
}); 

router.delete('/:id/posts/:post_id', (req, res) => {
    let id = req.params.id; 
    let post_id = req.params.post_id; 

    Posts.remove(post_id)
        .then(response => {
            console.log(response); 
            res.status(200).json({ message: `Post Id#${post_id} was successfully deleted!` }); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        }); 
}); 

module.exports = router; 