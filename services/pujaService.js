const Puja = require('../db/models/puja');
const ServiceProducto = require('../services/productoService')
const serviceProducto = new ServiceProducto();

class ServicePuja {
    constructor() {}

    async findAll() {
        const res = await Puja.find();
        return res;
    }

    async findById(id) {
        const res = await Puja.findById(id);
        return res;
    }

    async findByProduct(idProducto) {
        const res = await Puja.find({
            producto: idProducto
        })
        return res;
    }

    async findByUser(idUsuario) {
        const res = await Puja.find({
            usuario: idUsuario
        })
        return res;
    }

    async findByUserAndProduct(usuario, producto) {
        const res = Puja.find(
            {
                usuario: usuario,
                producto: producto
            }
        );
        return res;
    }

    async create(usuario, cantidad, producto) {
        const pujaCreada = await Puja.create(
            {
                usuario: usuario,
                cantidad: cantidad,
                fecha: Date(),
                producto: producto
            }
        );
        return pujaCreada;
    }

    /**
     * Comprueba que la puja que se quiere realizar por el producto es válida.
     *
     * La puja se considera inválida cuando:
     *  - El pujador es el propietario del producto.
     *  - El pujador ya es quien tiene la puja más alta sobre el producto.
     *  - La puja no supera la cantidad más alta para el producto.
     * @param usuario
     * @param cantidad
     * @param producto
     */
    async checkPuja(usuario, cantidad, producto) {
        const pujasProducto = await this.findByProduct(producto);
        const foundProducto = await serviceProducto.findById(producto);

        if (foundProducto.usuario === usuario) {
            return 'Eres el propietario del producto ' + producto + ' y no puedes hacer pujas sobre él';
        }else {
            if (pujasProducto.length > 0) {
                const pujaMasAlta = pujasProducto.slice(-1)[0];
                if (pujaMasAlta.usuario === usuario) {
                    return 'Ya eres el usuario con la puja más alta para el producto ' + producto;
                } else if (pujaMasAlta.cantidad >= cantidad) {
                    return 'La puja no supera la puja más alta para el producto ' + producto;
                } else {
                    return 'ok';
                }
            }
        }

        if (cantidad < foundProducto.precioInicial) {
            return 'La cantidad a pujar debe ser mayor que el precio inicial del producto';
        }

        return 'ok';
    }

    async update(id, usuario, cantidad, fecha, producto) {
        const res = await Puja.findByIdAndUpdate(id,
            {
                usuario: usuario,
                cantidad: cantidad,
                fecha: fecha,
                producto: producto
            },
            { new: true }
        );
        return res;
    }

    async deletePujasByProduct(producto) {
        const res = await Puja.deleteMany(
            {
                producto: producto
            }
        );
        return res;
    }

    async delete(id) {
        const res = await Puja.findByIdAndDelete(id);
        return res;
    }
}

module.exports = ServicePuja;

