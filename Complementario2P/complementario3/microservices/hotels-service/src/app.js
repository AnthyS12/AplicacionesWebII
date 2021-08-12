const express = require('express');
const app = express();

//Definir db
const response =
{
    data: [],
    services: "Hotels services",
    architecture: "Microservices"
}
//funcion flecha-mensaje
const logger = message=> console.log("[Hotels Service]:"+message);

app.use((req, res, next) => {
    response.data = [];
    next();
})
//http://localhost:3000/api/v2/hotels
app.get("/api/v2/hotels", (req, res) => {
    response.data.push(
        "Hotel Manta",
        "Hotel Quito",
        "Hotel Guayaquil"
    );
    //Pasar mensaje
    logger("Get data hotels");
    return res.send(response);
})
module.exports = app;