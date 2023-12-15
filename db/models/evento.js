const {Schema, model} = require('mongoose')
const mongoose = require('mongoose')
const eventoSchema = new Schema({
    nombre: String,
    lugar: Number,
    organizador: String,
    timestamp: Date,
    lat: Number,
    lon: Number,
    imagen: String
})


module.exports = mongoose.models.Evento || mongoose.model('Evento', eventoSchema)
