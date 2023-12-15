const express = require('express')
const routerEvento = express.Router()
const eventoController = require('../controllers/eventoController')

routerEvento.get('/:lugar', eventoController.listarEventos)   
            .get('/:id', eventoController.listarEventos)         
            .post('/', eventoController.guardarEvento)
            .put('/', eventoController.guardarEvento)
            .delete('/:id', eventoController.borrarEvento);

module.exports = {routerEvento};