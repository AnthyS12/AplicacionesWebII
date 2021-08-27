const { createContainer, asClass, asValue, asFunction } = require('awilix');

const config = require('../config');
const app = require('.');

//importar servicios
const { HomeService, UserService } =  require('../services')

//importar controladores
const { HomeController, UserController  } = require('../controllers')

//importar rutas
const { HomeRoutes, UserRoutes  } = require('../routes/index.routes');
const Routes = require('../routes')

//modelos
const { User } = require('../models')

//repositorios

const { UserRepository } = require('../repositories')


const container=  createContainer();

container
.register(
    {
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    }
)
.register(
    {
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton()
    }
)
.register(
    {
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton()
    }
)
.register(
    {
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton()
    }
)
.register(
    {
        User: asValue(User)
    }
)
.register(
    {
        UserRepository: asClass(UserRepository).singleton()
    }
)


//scope      this

module.exports= container;