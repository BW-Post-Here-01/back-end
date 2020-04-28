const db = require("../database/dbConfig.js"); 

module.exports = {
    find, 
    findBy, 
    findById, 
    findByUsername, 
    findByEmail, 
    add,
    remove, 
    update, 
}

function find(){
    return db("users").select("username"); 
}

function findBy(filter){
    return db("users").where(filter); 
}

function findByUsername(username){
    return db("users").where({username}); 
}

function findByEmail(email){
    return db("users").where({ email }); 
}

function findById(id){
    return db("users").where({ id }).first(); 
}

async function add(user){
    const [id] = await db("users").insert(user, "id"); 
    return findById(id); 
}

function remove(id){
    return db("users").where({ id }).del(); 
}

function update(id, user){
    return db('users').where({ id }).update({username: user.username, password: user.password, 
        name: user.name, email: user.email, user_type: user.user_type }); 
}
