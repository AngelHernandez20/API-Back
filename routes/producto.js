const express = require('express');
const router = express.Router();
const productoService = require('../controllers/productoService')
const jwt = require('jsonwebtoken')
const configuration = require('../ConfigServer')

//Zona de Middleware
router.use('/', (req, res, next) => {
    //Paso 1.
    const token =req.headers['authorization']
    if (!token){
        next()
        req.user = null
        return
    }
    jwt.verify(token,configuration.jwt.secret,(err, user)=>{
        if (err)
            req.user = null
        else
            req.user = user
        next()
    })
})

//Zona de Routing
router.get('/productoValidate/:nombre',productoService.productoValidate);
    router.post('/productoAdd',productoService.productoAdd)  //Servicio exclusivo para usuarios validados
router.get('/getAllProducto',productoService.getAllProducto);
router.delete('/deleteProducto/:idproductos', productoService.deleteProducto);


module.exports = router;

/*
    URL params
    Query Params
    Body
 */
