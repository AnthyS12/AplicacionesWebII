const express = require('express');


let _express=null;  //// rutas
let _config= null; //// PORT

class Server
{
    constructor({ router, config })
    {
        _config= config;
        _express =  express().use(router);

    }
    ///iniciar la app
    start()
    {
        return new Promise( resolve =>{
            _express.listen( _config.PORT, ()=>{
                console.log(`El servidor ${_config.APPLICATION_NAME} se esta ejecuntando en el puerto ${_config.PORT}`)
                resolve();
            })
        });
    }

}


module.exports = Server;

