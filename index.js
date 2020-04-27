const server = require("./api/server.js"); 

const port = 5000 || process.env.DB_PORT; 

server.listen(port, () => {
    console.log(`Server listening on ${port}`); 
})