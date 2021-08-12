//2Inicializar servicio
const server = require("./src/app");
//Escuchar puerto 3000
server.listen(process.env.PORT)
