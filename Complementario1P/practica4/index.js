const mongoose = require('mongoose');
const { MONGO_URI } = require("./config");
const axios = require("axios").default;
const cheerio = require("cheerio");
const cron = require("node-cron");
const express = require('express')

const server = express();

const conexion = MONGO_URI


mongoose.connect(conexion, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const  Noticias  = require("./models/noticias");


server.listen(8080, ()=>{
    console.log(`Servidor corriendo en el puerto 8080`);
})

// obtener noticias

server.get('/news',(req,res)=>{

    Noticias.find().exec((err, noticias) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al hacer la consulta'

            });

        }
        if (noticias.length == 0) {
       
            return res.status(200).send({
                status: 'success',
                message: 'No hay noticias que mostrar'

            });

        }
        // devolver resultado 

        return res.status(200).send({
            status: 'success',
            noticias

        });
    });
})

