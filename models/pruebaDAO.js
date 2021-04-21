const bd = require('../configMysql')

module.exports = {
    findByUsername : (username, callback) => {
        let sql = 'SELECT * FROM prueba WHERE nombre=?'
        bd.query(sql,username, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0]) //Enviar el primer registro de la consulta
            else
                callback(null)
        })
    },
    getAllUsers : (callback) => {

    },
    insertPrueba : (user, okCallback, failCallback) => {
        let sql = 'INSERT INTO prueba SET ?'
        bd.query(sql, user, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    },

    getAllPlanta: (callback) => {
        let sql = 'SELECT * FROM prueba'
        bd.query(sql,(err, data) => {
            if (err) throw err

            if (data.length > 0)
                callback(data)
            else
                callback(null)
        })
    },

    deletePlanta: (idprueba, callback) => {
        let sql = 'DELETE FROM prueba WHERE idprueba = ?'
        bd.query(sql,idprueba, (err, data) => {
            console.log("err =>",err)
            console.log("data =>",data)
            try {
                if (err) throw new Err('Error en la eliminación')
                return callback(data)
            }
            catch (Err) {
                return callback(null)
            }
        })
    }

};