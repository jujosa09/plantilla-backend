const { cloudinary } = require('../storage');
const Producto = require('../db/models/evento');

async function uploadImage(eventoId, image){
    try {
        console.log(productoId)
        console.log(image)
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return { statusCode: 400, message: "No existe el evento" };
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'EventoImages' },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject({ statusCode: 500, message: "Error al subir imagen a Cloudinary" });
                    } else {
                        evento.imagen = result.secure_url;
                        evento.save()
                            .then((evento) => {
                                resolve({ statusCode: 200, message: evento });
                            })
                            .catch((err) => {
                                console.error(err);
                                reject({ statusCode: 500, message: "Error al guardar la imagen en el evento" });
                            });
                    }
                }
            ).end(image);
        });

        console.log(result.message);
        return result;
    } catch (error) {
        console.error(error);
        return { statusCode: 500, message: "Error en la carga de la imagen" };
    }
}

module.exports = {
    uploadImage
};