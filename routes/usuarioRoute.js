const express = require('express')
const { createUsuarioController, getUsuarioByIdController, deleteUsuarioController, updateUsuarioController,
        checkUserFromGoogle,checkToken
} = require('../controllers/usuarioController')

const routerUsuario = express.Router()

routerUsuario.post('/', createUsuarioController)
routerUsuario.get('/', getUsuarioByIdController)
routerUsuario.delete('/:correo', deleteUsuarioController)
routerUsuario.put('/', updateUsuarioController)
routerUsuario.get('/checkToken', checkToken)
routerUsuario.get('/checkOrCreate', checkUserFromGoogle)

module.exports = {
    routerUsuario
}
