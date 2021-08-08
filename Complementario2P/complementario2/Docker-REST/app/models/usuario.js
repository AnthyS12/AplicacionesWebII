let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Definicion schema de usuario
let UsuarioSchema = new Schema(
    {
        nombre:
        {
            type: String,
            required: true
        },
        apellido:
        {
            type: String,
            required: true
        },
        telefono:
        {
            type: String,
            required: true
        },
        direccion:
        {
            type: String,
            required: true
        },
        /*createdAt: 
        { type: Date, 
            default: Date.now 
        },*/
    },
    {
        //versionKey: false,
        timestamps: true
    }
);

// Establece el parámetro createdAt igual a la hora actual
UsuarioSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Exporta UsuarioSchema para su uso en otros lugares.
module.exports = mongoose.model('Usuario', UsuarioSchema);