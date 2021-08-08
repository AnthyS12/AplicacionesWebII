let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let usuario = require('./app/routes/usuario');
//Cargamos la ubicación de la db de los archivos JSON
//Opciones de db
let config = require('config');
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
  };
//Conexion db
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexión:'));
//No muestra el registro cuando se prueba
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //Usar morgan para iniciar sesión en la línea de comando
    app.use(morgan('combined')); //Combinado-Genera los logs estilo Apache
}
//Analizar 'application/json'-buscar texto sin formato
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


//---------------------------------------------------------------------------//

app.get("/", (req, res) => res.json({ message: "Bienvenido usuario!" }));

app.route("/usuario")
    .get(usuario.getUsuarios)
    .post(usuario.postUsuario);
app.route("/usuario/:id")
    .get(usuario.getUsuario)
    .delete(usuario.deleteUsuario)
    .put(usuario.updateUsuario);

//Escuchando en el puerto 3000
app.listen(port);
console.log("Listening on port " + port);
//Para las pruebas
module.exports = app; 

//docker-compose up –build 



