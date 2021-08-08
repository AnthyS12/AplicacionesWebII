let mongoose = require('mongoose');
let Usuario = require('../models/usuario');

//GET -Ruta para recuperar todos los usuarios. 
function getUsuarios(req, res) {
// Consulta la base de datos y si no hay errores, envía a todos los usuarios.
    let query = Usuario.find({});
    query.exec((err, usuarios) => {
        if(err) res.send(err);   
// Si no hay errores envía de vuelta al usuario.
        res.json(usuarios);
    });
}

//POST-Para guardar un nuevo usuario.

function postUsuario(req, res) {
//Crear un nuevo usuario
    var newUsuario = new Usuario(req.body);
//Guardar en la bd
    newUsuario.save((err,usuario) => {
        if(err) {
            res.send(err);
        }
        else { 
//Si no hay errores, envíelo de vuelta al usuario
            res.json({message: "Usuario agregado con éxito!", usuario });
        }
    });
}

//GET-usuario/ruta para recuperar un usuario pdado su id
function getUsuario(req, res) {
    Usuario.findById(req.params.id, (err, usuario) => {
        if(err) res.send(err);
//Si no hay errores, devuélvalo al usuario
        res.json(usuario);
    });
}

//DELETE-usuario/Eliminar un usuario dado su id
function deleteUsuario(req, res) {
    Usuario.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Usuario eliminado correctamente!", result });
    });
}

//PUT-usuario/actualizar un usuario dado su id
function updateUsuario(req, res) {
    Usuario.findById({_id: req.params.id}, (err, usuario) => {
        if(err) res.send(err);
        Object.assign(usuario, req.body).save((err, usuario) => {
            if(err) res.send(err);
            res.json({ message: 'Usuario actualizado!', usuario });
        });
    });
}

//export all the functions
module.exports = { getUsuarios, postUsuario, getUsuario, deleteUsuario, updateUsuario };