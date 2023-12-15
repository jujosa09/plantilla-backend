const Evento = require('../db/models/evento');
const {uploadImage} = require('./imageService')

const ServiceCarbono = require('./carbonoService')

const serviceCarbono = new ServiceCarbono()

class ServiceEvento {
    constructor() {}

    async findById(id) {
        const res = await Evento.findById(id);
        return res;
    }

    async findByLugar(lugar){
        const res = await Evento.find({
            lugar: lugar
        }).sort({timestamp: -1})

        return res
    }

    async create(nombre, lugar, organizador, timestamp, imagen) {
        const coord = await serviceCarbono.getCoordenadasByCodPostal(lugar)
        const res = await Evento.create(
            {
                nombre: nombre,
                lugar: lugar,
                organizador: organizador,
                timestamp: timestamp,
                imagen: imagen,
                lat: coord["lat"],
                lon: coord["long"]
            }
        );

        const res_upload = await uploadImage(res._id, imagen)

        return res_upload;
    }


    async update(id, nombre, lugar, timestamp, imagen) {
        const coord = await getCoordenadasByCodPostal(lugar)
        const res = await Evento.findByIdAndUpdate(id,
            {
                nombre: nombre,
                direccion: direccion,
                timestamp: timestamp,
                lat: coord["lat"],
                lon: coord["long"]
            },
            { new: true }
        );

        const res_upload = await uploadImage(res._id, imagen)

        return res_upload;    
    }


    async delete(id) {
        const evento = await this.findById(id);
        const res = await Evento.findByIdAndDelete(id);
        return evento;
    }

}

module.exports = ServiceEvento;