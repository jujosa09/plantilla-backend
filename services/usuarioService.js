const Usuario = require('../db/models/usuario');
class ServiceUsuario {
    constructor() {}

    async createUsuario(usuario) {
        try {
            const foundUsuario = await Usuario.find({});
            const existingUsuarios = foundUsuario.map(usuario => usuario.toJSON());
    
            for (const existingUsuario of existingUsuarios) {
                if (existingUsuario['correo'] === usuario['correo']) {
                    return {message: "Ya existe un usuario con el mismo correo"};
                }
            }

            const res = await Usuario.create(
                {
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                }
            )


            return {message: 'ok', usuario: res};
        } catch (error) {
            return error;
        }
    }

    async getDataFromGoogleToken(token) {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token);
        const json = await response.json();

        return {status: response.status, res: json}

    }

    async createOrUpdateUsuarioFromGoogle(token) {
        try {
            //Obtenemos los datos del usuario de Google
            const json = await this.getDataFromGoogleToken(token);
            //Comprobamos si el usuario existe en la base de datos
            const usuario = await this.getUsuarioByCorreo(json.res.email);
            //Si no existe, lo creamos
            let result;
            if(usuario == [] || usuario === null){
                result = await Usuario.create(
                    {
                        nombre: json.res.name,
                        correo: json.res.email,
                        imagen: json.res.picture
                    }
                )
            //Si existe, en caso de que sea necesario actualizamos la imagen
            }else{
                if(usuario.imagen !== null|| usuario.imagen === json.picture){

                    result = await Usuario.findOneAndUpdate({correo: json.res.email}, { imagen: json.res.picture },
                        { new: true });
                }else{
                    result = usuario;
                }
            }
            return {status: 200, res: result};
        } catch (error) {
            return {status: 401, res: error};
        }
    }

    async verifyGoogleToken(googleToken) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken);

            if(response.status === 200){
                return {status: 200, res: "El token es válido"};
            }else{
                return {status: 401, res: "El token de sesión no es válido"}
            }

        }
        catch (error) {
            console.error('Error al verificar el token de Google:', error);
            return {status: 401, res: "token no valido"};
        }
    }

    async getUsuarioById(id) {
        const foundUsuario = await Usuario.findById(id)
        return foundUsuario;
    }

    async getUsuarioByNombre(nombreUsuario) {
        const foundUsuario = await Usuario.find({ nombre: nombreUsuario })
        return foundUsuario;
    }

    async getUsuarioByCorreo(correo) {
        const foundUsuario = await Usuario.find({ correo: correo })
        return foundUsuario;
    }

    async getUsuarios() {
        const foundUsuario = await Usuario.find()
        return foundUsuario;
    }

    async deleteUsuario(id) {
        const res = await Usuario.findOneAndDelete({correo: id});
        Usuario.findOne
        return res;
    }

    async updateUsuario(id, nombreUsuario, correo) {
        const usuario = await Usuario.findByIdAndUpdate(id, { nombre: nombreUsuario, correo: correo},
            { new: true });

        return usuario;
    }
}

module.exports = ServiceUsuario;