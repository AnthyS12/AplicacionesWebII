const express = require('express')
const server = express();

const fs = require('fs')

const home = fs.readFileSync('./views/index.html');
const about= fs.readFileSync('./views/about.html');

server.get('/',getHomePage)

server.get('/about',(req,res)=>{
    res.write(about)
})


server.listen(8080, ()=>{
    console.log(`Servidor corriendo en el puerto 8080`);
})


function getHomePage(req,res)
{
    return res.write(home)
}
