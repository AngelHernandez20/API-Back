const userDAO = require('../models/usersDAO')
const bcrypt = require('bcrypt')
const jwt = require('../utils/GenerateJWT')

const usernameValidate = (req, res) => {
    userDAO.findByUsername(req.params.username, (data) =>{
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

const signup = (req, res) => {
    console.log('Signup => in')


        const user = {
            idRol : req.body.idRol,
            nombre : req.body.nombre,
            apellidoPaterno : req.body.apellidoPaterno,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10)
        }
        userDAO.insertUser(user, (data) => {
            res.send({
                status: true,
                message: 'Usuario creado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al crear la cuenta de usuario',
                errorMessage: err
            })
        })



}

const login = (req,res) => {
    let username = req.body.username
    let password = req.body.password
    userDAO.findByUsername(username, (data) => {
        if (data) {
            console.log('Data =>',data)
            if (bcrypt.compareSync(password, data.password)){
                res.send({
                    status: true,
                    message: 'Contraseña correcta',
                    token: jwt.generateToken(data)
                })
            } else {
                res.send({
                    status: false,
                    message: 'Contraseña incorrecta'
                })
            }
        } else {
            res.send({
                status: false,
                message: 'La cuenta de usuario no existe'
            })
        }
    })
};

const getAllUsuario = (req,res) => {
    userDAO.getAllUser((data) =>{
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

const deleteUsuario = (req, res) => {
    userDAO.deleteUsuario(req.params.idUser, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del idRol: ${req.params.idUser}`)
            res.send({
                status: true,
                message: `Eliminación de idRol: ${req.params.idUser} fue exitosa`
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: 'Error :('
            })
        }
    })
};

const updateUsuario = (req, res) =>{

    const user = {
        nombre : req.body.nombre,
        apellidoPaterno : req.body.apellidoPaterno,
        username : req.body.username,

    }
    const id= req.body.idUser

    userDAO.updateUsuario(user, id, (data) => {
        res.send({
            status: true,
            message: 'usuario actualizado exitosamente'
        })
    }, err => {
        res.send({
            status:false,
            message: 'Ha ocurrido un error al actualizar el usuario',
            errorMessage: err
        })
    })
}

module.exports = {
    usernameValidate,
    signup,
    login,
    getAllUsuario,
    deleteUsuario,
    updateUsuario
}















