const pruebaDAO = require('../models/pruebaDAO')
const bcrypt = require('bcrypt')
const jwt = require('../utils/GenerateJWT')

const pruebanameValidate = (req, res) => {
    pruebaDAO.findByUsername(req.params.username, (data) =>{
        try {
            if (!data) throw new Err("Usuario disponible")

            res.send({
                status: true,
                message: 'Usuario ocupado'
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Usuario disponible'
            })
        }
    })
}

const addPrueba = (req, res) => {
    console.log('Signup => in')


    const user = {
        nombre : req.body.nombre,
        apellidoPaterno : req.body.apellidoPaterno,
        username : req.body.username,
        password : req.body.password
    }
    pruebaDAO.insertPrueba(user, (data) => {
        res.send({
            status: true,
            message: 'Planta agregada exitosamente'
        })
    }, err => {
        res.send({
            status:false,
            message: 'Ha ocurrido un error al registrar esta planta',
            errorMessage: err
        })
    })
};

const getAllPlanta = (req,res) => {
    pruebaDAO.getAllPlanta((data) =>{
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

const deletePlanta = (req, res) => {
    pruebaDAO.deletePlanta(req.params.idprueba, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del idRol: ${req.params.idprueba}`)
            res.send({
                status: true,
                message: `Eliminación de idRol: ${req.params.idprueba} fue exitosa`
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
    pruebanameValidate,
    addPrueba,
    getAllPlanta,
    deletePlanta
}



