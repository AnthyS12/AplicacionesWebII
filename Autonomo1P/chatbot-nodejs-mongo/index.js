
const mongoose = require('mongoose');
const { MONGO_URI } = require("./config");
const express = require('express');


const questionController = require('./controllers/questionController')
const answerController = require('./controllers/answerController')

const conexion = MONGO_URI
const server = express();




mongoose.connect(conexion, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


server.listen(8080, ()=>{
    console.log(`Servidor corriendo en el puerto 8080`);
})

questionController.saveQuestions()

answerController.validateAnswer()

