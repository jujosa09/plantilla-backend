const ServiceEvento = require('../services/eventoService');
const serviceEvento = new ServiceEvento();

const listarEventos = async(req, res) => {
    try {
        if (typeof req.params.lugar !== 'undefined' && req.params.lugar !== null && req.params.lugar !== '') {
            const eventos = await serviceEvento.findByLugar(req.params.lugar);
            res.status(200).send({evento: eventos});
          }else if(typeof req.params.id !== 'undefined' && req.params.id !== null && req.params.id !== ''){
            const evento = await serviceEvento.findById(req.params.id);
            res.status(200).send({evento: evento});
          }else{
            res.status(204).send({eventos: []})
          }
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}


const guardarEvento = async(req, res) => {
    try {
        
        if (typeof req.body.id !== "undefined" && req.body.id !== null && req.body.id !== '') {
            const evento = await serviceEvento.update(
                    req.body.id,
                    req.body.nombre,
                    req.body.lugar,
                    req.body.timestamp,
                    req.body.imagen
                );
            res.status(200).send({message: 'Evento ' + req.body.id + ' actualizado con éxito', evento: evento});
        } else {
            const evento = await serviceEvento.create(
                req.body.nombre,
                req.body.lugar,
                req.body.organizador,
                req.body.timestamp,
                req.body.imagen
            )
            res.status(201).send({message: 'Evento creado con éxito', evento: evento});
        }
        
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

const borrarEvento = async (req, res) => {
    try {
        const evento = await serviceEvento.delete(req.params.id);
        if (evento) {
            res.status(200).send({message: 'Evento ' + req.params.id + ' borrado con éxito', evento: evento});
        } else {
            res.status(400).send({message: 'No existe el evento ' + req.params.id});
        }

    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
}

module.exports = {listarEventos, guardarEvento, borrarEvento}