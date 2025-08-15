const {Sequelize} = require('sequilize')
/**
 * TODO: Lo que estamos haciendo aqui, es integrando la nueva forma de integrar la base de datos con la biblioteca de squelize
 * *Base de datos, usuario, password
 */
const sequelize = new Sequelize('libros', 'root', '', {
  host:'localhost',
  dialect:'mysql',
  logging:false
})


module.exports = sequelize