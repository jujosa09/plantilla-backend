const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const axios = require('axios')

async function verify(token) {
    
    return new Promise((resolve, reject) => {
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        .then(response => {
            console.log('Datos del Usuario:', response.data);
            resolve({ userData: response.data, statusCode: response.status });
        })
        .catch(error => {
            console.error('Error en la llamada API:', error);
            if (error.response) {
                // Rechazar la promesa con el código de estado y el mensaje de error
                reject({ statusCode: error.response.status, message: error.message });
            } else {
                // Rechazar la promesa con un error general
                reject({ statusCode: 500, message: "Error interno del servidor" });
            }
        });
    });
}

module.exports = {verify}