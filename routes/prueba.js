const express = require('express');
const router = express.Router();
const pruebaService = require('../controllers/pruebaService')
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
router.get('/pruebanameValidate/:username',pruebaService.pruebanameValidate);
router.post('/pruebaAdd',pruebaService.addPrueba)  //Servicio exclusivo para usuarios validados
router.get('/getAllPlanta',pruebaService.getAllPlanta);
router.delete('/deletePlanta/:idprueba', pruebaService.deletePlanta);


module.exports = router;

/*
    URL params
    Query Params
    Body
 */

