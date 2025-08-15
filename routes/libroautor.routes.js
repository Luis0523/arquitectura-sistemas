const express = require('express')
const db = require('../db/db')

const router = express.Router()

// CREATE
router.post('/libroautor', (req, res) => {
  const {
    libro_id,
    autor_id,
    estado,
    rol_autor,
    orden_autoria,
    nota,
    participacion_porcentaje,
    es_principal
  } = req.body

  const sql = `
    INSERT INTO libroautor (
      libro_id, autor_id, estado, rol_autor, orden_autoria, nota,
      participacion_porcentaje, es_principal
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(sql, [
    libro_id,
    autor_id,
    estado,
    rol_autor,
    orden_autoria,
    nota,
    participacion_porcentaje,
    es_principal
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo insertar libroautor, revisa la estructura' })
    }
    res.status(201).json({
      id: result.insertId,
      libro_id,
      autor_id,
      estado,
      rol_autor,
      orden_autoria,
      nota,
      participacion_porcentaje,
      es_principal
    })
  })
})

// READ (todos)
router.get('/libroautor', (req, res) => {
  db.query('SELECT * FROM libroautor', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la información de libroautor' })
    }
    res.json(results)
  })
})

// UPDATE
router.put('/libroautor/:id', (req, res) => {
  const { id } = req.params
  const {
    libro_id,
    autor_id,
    estado,
    rol_autor,
    orden_autoria,
    nota,
    participacion_porcentaje,
    es_principal
  } = req.body

  const sql = `
    UPDATE libroautor
    SET
      libro_id = ?,
      autor_id = ?,
      estado = ?,
      rol_autor = ?,
      orden_autoria = ?,
      nota = ?,
      participacion_porcentaje = ?,
      es_principal = ?
    WHERE id = ?
  `

  try {
    db.query(sql, [
      libro_id,
      autor_id,
      estado,
      rol_autor,
      orden_autoria,
      nota,
      participacion_porcentaje,
      es_principal,
      id
    ], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo actualizar libroautor ' + err })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro libroautor no encontrado' })
      }
      res.status(200).json({ mensaje: 'Actualizado', resultado: result })
    })
  } catch (error) {
    console.error('Error al actualizar el registro: ' + error)
  }
})

// DELETE
router.delete('/libroautor/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM libroautor WHERE id = ?'

  try {
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo eliminar el registro libroautor' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro libroautor no encontrado' })
      }
      res.status(200).json({ mensaje: 'Eliminado', id: Number(id) })
    })
  } catch (error) {
    console.error('Hubo un error en consola: ' + error)
  }
})

module.exports = router
