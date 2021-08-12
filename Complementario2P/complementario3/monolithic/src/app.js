//1crear rutas express
const express = require('express');
const app = express();
//Arr
const response =
{
    data: [],
    services: "Monolithic service",
    architecture: "Monolithic",
}
//Definir sercio monolitico-rutas

//get-  api/v1 
app.use((req,res,next)=>{
    response.data=[];
    next();
})
//get usuarios- http://localhost:3000/api/v1/users
app.get('/api/v1/users', (req,res)=>{
    response.data.push(
        'Administrador',
        'Invitado',
        'Anthony'
        );
    return res.send(response)
})
//get bebidas- api/v1/hotels
app.get('/api/v1/hotels',(req,res)=>{
    response.data.push(
        'El Oro',
        'Las Vegas',
        'Hotal Leo'
        );
    return res.send(response)
})
//get comidas- api/v1/bedrooms
app.get('/api/v1/bedrooms',(req,res)=>{
    response.data.push(
        'A-01',
        'A-02',
        'A-03'
        );
    return res.send(response)
})

module.exports = app;