const bd = require('../configMysql')

module.exports = {
    findByUsername : (username, callback) => {
        let sql = 'SELECT * FROM usuarios WHERE username=?'
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
    insertUser : (user, okCallback, failCallback) => {
        let sql = 'INSERT INTO usuarios SET ?'
        bd.query(sql, user, (err, data) => {
            if (err)
                return failCallback(err)
            else
                return okCallback(data)
        })
    },

    getAllUser: (callback) => {
        let sql = 'SELECT * FROM usuarios'
        bd.query(sql,(err, data) => {
            if (err) throw err

            if (data.length > 0)
                callback(data)
            else
                callback(null)
        })
    },

    deleteUsuario: (idUser, callback) => {
        let sql = 'DELETE FROM usuarios WHERE idUser = ?'
        bd.query(sql,idUser, (err, data) => {
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
    },

    updateUsuario : (user, idUser, callback) => {
        let sql = 'UPDATE usuarios SET ? WHERE idUser = ?'
        bd.query(sql, [user, idUser], (err, data) => {
            console.log(err);
            if (err)

                return callback(null)
            else
                return callback(data)
        })
    },
};