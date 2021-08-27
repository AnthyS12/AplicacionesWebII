let mongoose = require('mongoose');

let Schema =  mongoose.Schema;


let UserShema=new Schema({
    name: {type:String, required:true},
    username: {type:String, required:true},
    tipo_usuario: {type:String, required:true},
    password: {type:String, required:true}
})


let Usuario =   mongoose.model('Usuarios', UserShema);

module.exports = Usuario;

