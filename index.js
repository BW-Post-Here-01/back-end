const server = require("./api/server.js"); 

const port = 5000 || process.env.PORT; 

server.listen(port, () => {
    console.log(`Server listening on ${port}`); 
})