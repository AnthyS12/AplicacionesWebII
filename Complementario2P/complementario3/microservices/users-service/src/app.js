const express = require('express');
const app = express();

//Definir db
const response =
{
    data: [],
    services: "Users services",
    architecture: "Microservices"
}
//funcion fleca-mensaje
const logger = message=> console.log("[User Service]:"+message);

app.use((req, res, next) => {
    response.data = [];
    next();
})
//http://localhost:3000/api/v2/users
app.get("/api/v2/users", (req, res) => {
    response.data.push(
        "Admin",
        "Admin2",
        "Admin3"
    );
    //Pasar mensaje
    logger("Get user request");
    return res.send(response);
})
module.exports = app;