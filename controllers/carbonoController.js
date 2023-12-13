const ServiceCarbono = require('../services/carbonoService');
const serviceCarbono = new ServiceCarbono();

const getCoordinatesFromPostalCode = async (req, res, next) => {
    try {
        const coordenadas = await serviceCarbono.getCoordenadasByCodPostal(req.query.codPostal)
        res.status(200).json(coordenadas)
    } catch (error) {
        res.status(401).send({success: false, message: 'No se ha podido obtener las coordenadas para el código postal ' + req.query.codPostal});
    }
}


module.exports = {getCoordinatesFromPostalCode}