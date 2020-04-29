const db = require("../database/dbConfig.js"); 

module.exports = {
    findByUserId, 
    findBy, 
    findByPostId, 
    add,
    remove,
    update, 
}

function findBy(filter){
    return db("posts").where(filter); 
}

function findByUserId(id){
    return db("posts").where({ user_id: id }); 
}

function findByPostId(id){
    console.log("post id: ", id); 
    return db("posts").where({ id }); 

    //return db("posts").where({ id }).first(); 
}

async function add(post){
    const [id] = await db("posts").insert(post, "id"); 
    return findByPostId(id); 
}

function remove(id){
    return db("posts").where({id}).del(); 
}

function update(id, body){
    let { post_title, post_text } = body; 
    db("posts").where({ id }).update({ post_title, post_text }); 
    return findByPostId(id); 
}
