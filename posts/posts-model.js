const db = require("../database/dbConfig.js"); 

module.exports = {
    find, 
    findBy, 
    findById, 
    add,
    remove,
    update, 
}

function find(){
    return db("posts"); 
}

function findBy(filter){
    return db("posts").where(filter); 
}

function findById(id){
    return db("posts").where({ id }).first(); 
}

async function add(post){
    const [id] = await db("posts").insert(post, "id"); 
    return findById(id); 
}

function remove(id){
    return db("posts").where({id}).del(); 
}

function update(id, body){
    let { post_title, post_text } = body; 
    db("posts").where({ id }).update({ post_title, post_text }); 
    return findById(id); 
}