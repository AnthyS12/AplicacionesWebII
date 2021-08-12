const express = require('express');
const app = express();

//Definir db
const response =
{
    data: [],
    services: "Bedrooms services",
    architecture: "Microservices"
}
//funcion flecha-mensaje
const logger = message=> console.log("[Bedrooms Service]:"+message);

app.use((req, res, next) => {
    response.data = [];
    next();
})
//http://localhost:3000/api/v2/bedrooms
app.get("/api/v2/bedrooms", (req, res) => {
    response.data.push(
        "B-01",
        "B-02",
        "B-03"
    );
    //Pasar mensaje
    logger("Get data bedrooms");
    return res.send(response);
})
module.exports = app;