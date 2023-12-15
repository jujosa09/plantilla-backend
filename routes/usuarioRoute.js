const express = require('express')
const { checkUserFromGoogle,checkToken } = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.get('/checkToken', checkToken)
routerUsuario.get('/checkOrCreate', checkUserFromGoogle)

module.exports = {
    routerUsuario
}
