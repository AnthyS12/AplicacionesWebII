//core
const express = require('express');
//terceros
const cors= require('cors');
const helmet =  require('helmet');
const compression = require('compression');
require('express-async-errors');

// propios
const { NotFoundMiddleware, ErrorMiddleware }  = require('../middlewares');

module.exports =  function({ HomeRoutes, UserRoutes }){
    const router = express.Router();
    const apiRoutes = express.Router();
    apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());
    
    apiRoutes.use('/home', HomeRoutes);
    apiRoutes.use('/user', UserRoutes);



    router.use('/v1/api', apiRoutes);
    router.use('/public', express.static('public') )

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;

    ////http://localhost:5000/v1/api/cliente/clientePorNombre
}

