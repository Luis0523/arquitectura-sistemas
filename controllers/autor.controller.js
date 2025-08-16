/** @type {import('sequelize').Model} */
const AutorModel = require('../models/autor.model')

exports.getAutores = async (req, res) => {
    try {
        const autores = await AutorModel.findAll()
        res.status(200).json(autores)
    } catch (e) {
        res.status(500).json({
            error: e,
            menssage: 'Error al obtener los autores'
        })
    }
}

exports.getAutorById = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await AutorModel.findByPk(id)
        if(!autor){
            return res.status(404).json({error: 'Autor no encontrado en la base de datos'})
        }

        res.status(200).json(autor)
    } catch (e) {
        res.status(500).json({
            error: e,
            menssage: 'Error al obtener los autores'
        })
    }
}

