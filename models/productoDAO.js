const bd = require('../configMysql')

module.exports = {

    findByProductoname : (nombre, callback) => {
        let sql = 'SELECT * FROM productos WHERE nombre=?'
        bd.query(sql,nombre, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0]) //Enviar el primer registro de la consulta
            else
                callback(null)
        })
    },
    getAllUsers : (callback) => {

    },
    insertProducto : (producto, okCallback, failCallback) => {
        let sql = 'INSERT INTO productos SET ?'
        bd.query(sql, producto, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    },

    getAllProducto: (callback) => {
        let sql = 'SELECT * FROM productos'
        bd.query(sql,(err, data) => {
            if (err) throw err

            if (data.length > 0)
                callback(data)
            else
                callback(null)
        })
    },

    deleteProducto: (idproductos, callback) => {
        let sql = 'DELETE FROM productos WHERE idproductos = ?'
        bd.query(sql,idproductos, (err, data) => {
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