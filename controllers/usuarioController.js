const ServiceUsuario = require('../services/usuarioService');
const serviceUsuario = new ServiceUsuario();

const createUsuarioController = async (req, res, next) => {


    if (!req.body){
        return res.status(400).json({
            error: "El usuario no existe"
        })
    }
    try{
        const usuario = await serviceUsuario.createUsuario(req.body);
        if (usuario.message !== 'ok') {
            res.status(409).send({message: usuario.message});
        } else {
            res.status(201).send({message: "Usuario " + usuario.usuario.correo + " creado con éxito", usuario: usuario.usuario});
        }
    }catch (error) {
        res.status(500).send({success: false, message: error.message});
    }

}

const checkToken = async (req, res, next) => {
    try{
        const isValid = await serviceUsuario.verifyGoogleToken(req.query.token)

        res.status(isValid.status).send(isValid);

    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}

const checkUserFromGoogle = async (req, res, next) => {
    try{
        const isValid = await serviceUsuario.verifyGoogleToken(req.query.token)
        if(isValid.status === 200){
            const usuario = await serviceUsuario.createOrUpdateUsuarioFromGoogle(req.query.token)
            res.status(usuario.status).send(usuario.res);
        }else{
            res.status(isValid.status).send(isValid.res);
        }

    }catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const getUsuarioByIdController = async (req, res, next) => {
    
    try{
        if(req.query.nombre){
            usuario = await serviceUsuario.getUsuarioByNombre(req.query.nombre)
        }else if(req.query.correo){
            usuario = await serviceUsuario.getUsuarioByCorreo(req.query.correo)
        }else{
            usuario = await serviceUsuario.getUsuarios()
        }

        res.status(200).send(usuario);
    
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}

const deleteUsuarioController = async (req, res, next) => {
    try{
        const response = await serviceUsuario.deleteUsuario(req.params.correo)
        res.status(response.status).send(response.res);
    }catch(error){
        res.status(500).send({success: false, message: error.message});
     }
     
 }

const updateUsuarioController = async (req, res, next) => {
    try{
        const response = await serviceUsuario.updateUsuario(req.body.id, req.body.nombre, req.body.correo)
        if(response === null){
            res.status(400).send("El usuario que quiere actualizar no existe");
        }else{
            res.status(200).send({usuario: response});
        }
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
    
}

module.exports = {
    createUsuarioController,
    getUsuarioByIdController,
    deleteUsuarioController,
    updateUsuarioController,
    checkUserFromGoogle,
    checkToken
}