const productoDAO = require('../models/productoDAO')
const bcrypt = require('bcrypt')
const jwt = require('../utils/GenerateJWT')

const productoValidate = (req, res) => {
    productoDAO.findByProductoname(req.params.nombre, (data) =>{
        try {
            if (!data) throw new Err("Nombre del producto disponible")

            res.send({
                status: true,
                message: 'Producto Ocupado'
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Producto disponible'
            })
        }
    })
}

const productoAdd = (req, res) => {
    console.log('Signup => in')


    const producto = {
        nombre : req.body.nombre,
        precio : req.body.precio,
        cantidad : req.body.cantidad,
    }
    productoDAO.insertProducto(producto, (data) => {
        res.send({
            status: true,
            message: 'Producto creado exitosamente'
        })
    }, err => {
        res.send({
            status:false,
            message: 'Ha ocurrido un error al crear el producto',
            errorMessage: err
        })
    })

};

const getAllProducto = (req,res) => {
    productoDAO.getAllProducto((data) =>{
        try {
            if (!data) throw new Err("Catálogo vacío")

            res.send({
                status: true,
                data: data
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Catálogo vacío'
            })
        }
    })
};

const deleteProducto = (req, res) => {
    productoDAO.deleteProducto(req.params.idproductos, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del idRol: ${req.params.idproductos}`)
            res.send({
                status: true,
                message: `Eliminación de idRol: ${req.params.idproductos} fue exitosa`
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: '<Personalizar el mensaje de error'
            })
        }
    })
};

module.exports = {
    productoValidate,
    productoAdd,
    getAllProducto,
    deleteProducto
}




