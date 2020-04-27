const db = require("../database/dbConfig.js"); 

module.exports = {
    find, 
    findBy, 
    findById, 
    add,
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