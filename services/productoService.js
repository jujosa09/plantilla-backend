const Producto = require('../db/models/producto');

class ServiceProducto {
    constructor() {}

    async findAll() {
        const res = await Producto.find().sort({fechaInicio: -1});
        return res;
    }

    async findById(id) {
        const res = await Producto.findById(id);
        return res;
    }

    async findByNombre(nombre) {
        const res = await Producto.find(
            {
                nombre: nombre
            }
        );
        return res;
    }

    async findByUsuario(usuario) {
        const res = await Producto.find(
            {
                usuario: usuario
            }
        ).sort({fechaInicio: -1});
        return res;
    }

    async findByPrecio(precio) {
        const res = await Producto.find(
            {
                precioActual: precio
            }
        );
        return res;
    }

    async filterProductos(usuario, texto, order) {
        let filtroBusqueda = {};

        if (typeof texto !== 'undefined') {
            filtroBusqueda = {
                $or: [
                    {
                        nombre:
                        {
                            '$regex': texto,
                            '$options': 'i'
                        }
                    },

                    {
                        descripcion:
                        {
                            '$regex': texto,
                            '$options': 'i'
                        }
                    }
                ]
            }
        }

        if (typeof usuario !== 'undefined') {
            filtroBusqueda.usuario = usuario;
        }

        let res = [];
        switch (String(order)) {
            case "Activa":
                filtroBusqueda.fechaCierre = {$gte: new Date()};
                res = await Producto.find(filtroBusqueda).sort({fechaInicio: -1});
                break;
            case "Finalizada":
                filtroBusqueda.fechaCierre = {$lte: new Date()};
                res = await Producto.find(filtroBusqueda).sort({fechaInicio: -1});
                break;
            case "Precio_Asc":
                res = await Producto.find(filtroBusqueda).sort({precioInicial: 1});
                break;
            case "Precio_Desc":
                res = await Producto.find(filtroBusqueda).sort({precioInicial: -1});
                break;
            case "Fecha_Asc":
                res = await Producto.find(filtroBusqueda).sort({fechaInicio: 1});
                break;

            default:
                res = await Producto.find(filtroBusqueda).sort({fechaInicio: -1});
                break;
        }

        return res;
    }

    async checkProducto(nombre, usuario) {
        const productosUsuario = await this.findByUsuario(usuario);
        let i = 0;
        while (i < productosUsuario.length && productosUsuario[i].nombre !== nombre) {
            i++;
        }

        return i < productosUsuario.length?
            'Ya existe un producto con el mismo nombre para el usuario ' + usuario : 'ok';
        
       
    }

    async create(nombre, direccion, usuario, precioInicial, fechaCierre, descripcion, imagen) {
        console.log(imagen)
        const res = await Producto.create(
            {
                nombre: nombre,
                direccion: direccion,
                usuario: usuario,
                precioInicial: precioInicial,
                fechaInicio: Date(),
                fechaCierre: fechaCierre,
                descripcion: descripcion,
                imagen: imagen,
            }
        );

        const res_upload = await uploadImage(res._id, res.imagen)

        return res_upload;
    }

    async checkProductoActualizable(id) {
        const producto = await this.findById(id);
        if (!producto.puja) {
            return 'ok';
        } else {
            return 'No se puede actualizar el producto ' + id + ' porque ya han pujado sobre él';
        }
    }

    async update(id, nombre, direccion, descripcion, imagen) {
        const res = await Producto.findByIdAndUpdate(id,
            {
                nombre: nombre,
                direccion: direccion,
                descripcion: descripcion,
                imagen: imagen
            },
            { new: true }
        );
        return res;
    }


    async delete(id) {
        const producto = await this.findById(id);
        const res = await Producto.findByIdAndDelete(id);
        return producto;
    }

}

module.exports = ServiceProducto;