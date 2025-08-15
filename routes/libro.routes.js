const express = require('express')
const db = require('../db/db')

const router = express.Router()

//CRUD
//METODOS
//post, GET, PUT, DELETE

// CREATE
router.post('/libro', (req, res) => {
  const {
    titulo,
    anio_publicacion,
    genero,
    ejemplares_disponibles,
    estado,
    isbn,
    idioma,
    descripcion_corta,
    portada_url,
    edicion
  } = req.body

  const sql = `
    INSERT INTO libro (
      titulo, anio_publicacion, genero, ejemplares_disponibles, estado,
      isbn, idioma, descripcion_corta, portada_url, edicion
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      titulo,
      anio_publicacion,
      genero,
      ejemplares_disponibles,
      estado,
      isbn,
      idioma,
      descripcion_corta,
      portada_url,
      edicion
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo insertar el libro, revisa la estructura' })
      }

      res.status(201).json({
        id: result.insertId,
        titulo,
        anio_publicacion,
        genero,
        ejemplares_disponibles,
        estado,
        isbn,
        idioma,
        descripcion_corta,
        portada_url,
        edicion
      })
    }
  )
})

// READ (todos)
router.get('/libro', (req, res) => {
  db.query('SELECT * FROM libro', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Hubo un error al obtener la información' })
    }
    res.json(results)
  })
})

// UPDATE
router.put('/libro/:id', (req, res) => {
  const id = req.params.id
  const {
    titulo,
    anio_publicacion,
    genero,
    ejemplares_disponibles,
    estado,
    isbn,
    idioma,
    descripcion_corta,
    portada_url,
    edicion
  } = req.body

  const sql = `
    UPDATE libro
    SET
      titulo = ?,
      anio_publicacion = ?,
      genero = ?,
      ejemplares_disponibles = ?,
      estado = ?,
      isbn = ?,
      idioma = ?,
      descripcion_corta = ?,
      portada_url = ?,
      edicion = ?
    WHERE id = ?
  `

  try {
    db.query(
      sql,
      [
        titulo,
        anio_publicacion,
        genero,
        ejemplares_disponibles,
        estado,
        isbn,
        idioma,
        descripcion_corta,
        portada_url,
        edicion,
        id
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'No se pudo actualizar el libro ' + err })
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Libro no encontrado' })
        }
        res.status(200).json({ mensaje: 'Actualizado', resultado: result })
      }
    )
  } catch (e) {
    console.error('Error al actualizar el registro: ' + e)
  }
})

// DELETE
router.delete('/libro/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM libro WHERE id = ?'
  try {
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo eliminar' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No encontramos el libro' })
      }
      res.status(200).json({ mensaje: 'Eliminado', id: Number(id) })
    })
  } catch (error) {
    console.error('Hubo un error en consola: ' + error)
  }
})

module.exports = router
