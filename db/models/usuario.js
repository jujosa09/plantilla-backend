const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, unique: true},
    imagen: String,
    localizacion: [JSON]
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
