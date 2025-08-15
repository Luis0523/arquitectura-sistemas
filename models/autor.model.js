const {DataTypes} = require ('sequelize')
const db = require('../db/db')//Archivo de la base de datos. 

/**
 * *LO QUE ESTAMOS haciendo aqui, es modelar, la estructura de la base de datos dentro del servidor, para 
 * *evitar que nos inserten un SQL, y exista problemas de seguridad, ademas ayuda a ordenar el codigo, y estar mas estructurado
 */

const Autor = db.define('autor', {
    nombre:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado:{
        type: DataTypes.TINYINT,
        allowNull:false
    }
    
}, {
    tableName:'autor',
    timestamps: true
})

module.exports = Autor