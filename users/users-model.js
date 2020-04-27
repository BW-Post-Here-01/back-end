const db = require("../database/dbConfig.js"); 

module.exports = {
    find, 
    findBy, 
    findById, 
    add,
}

function find(){
    return db("users").select("username"); 
}

function findBy(filter){
    return db("users").where(filter); 
}

function findById(id){
    return db("users").where({ id }).first(); 
}

async function add(user){
    const [id] = await db("users").insert(user, "id"); 
    return findById(id); 
}