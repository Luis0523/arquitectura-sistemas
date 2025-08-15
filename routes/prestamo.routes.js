const express = require('express')
const db = require('../db/db')

const router = express.Router()

// CREATE
router.post('/prestamo', (req, res) => {
  const {
    fecha_prestamo,
    fecha_devolucion,
    libro_id,
    persona_id,
    estado,
    observaciones,
    renovaciones,
    recargo,
    estado_prestamo,
    fecha_entregado
  } = req.body

  const sql = `
    INSERT INTO prestamo (
      fecha_prestamo, fecha_devolucion, libro_id, persona_id, estado,
      observaciones, renovaciones, recargo, estado_prestamo, fecha_entregado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(sql, [
    fecha_prestamo,
    fecha_devolucion,
    libro_id,
    persona_id,
    estado,
    observaciones,
    renovaciones,
    recargo,
    estado_prestamo,
    fecha_entregado
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo insertar el préstamo, revisa la estructura' })
    }
    res.status(201).json({
      id: result.insertId,
      fecha_prestamo,
      fecha_devolucion,
      libro_id,
      persona_id,
      estado,
      observaciones,
      renovaciones,
      recargo,
      estado_prestamo,
      fecha_entregado
    })
  })
})

// READ (todos)
router.get('/prestamo', (req, res) => {
  db.query('SELECT * FROM prestamo', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la información de préstamos' })
    }
    res.json(results)
  })
})

// UPDATE
router.put('/prestamo/:id', (req, res) => {
  const { id } = req.params
  const {
    fecha_prestamo,
    fecha_devolucion,
    libro_id,
    persona_id,
    estado,
    observaciones,
    renovaciones,
    recargo,
    estado_prestamo,
    fecha_entregado
  } = req.body

  const sql = `
    UPDATE prestamo
    SET fecha_prestamo = ?, fecha_devolucion = ?, libro_id = ?, persona_id = ?, estado = ?,
        observaciones = ?, renovaciones = ?, recargo = ?, estado_prestamo = ?, fecha_entregado = ?
    WHERE id = ?
  `

  try {
    db.query(sql, [
      fecha_prestamo,
      fecha_devolucion,
      libro_id,
      persona_id,
      estado,
      observaciones,
      renovaciones,
      recargo,
      estado_prestamo,
      fecha_entregado,
      id
    ], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo actualizar el préstamo ' + err })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Préstamo no encontrado' })
      }
      res.status(200).json({ mensaje: 'Actualizado', resultado: result })
    })
  } catch (error) {
    console.error('Error al actualizar el registro: ' + error)
  }
})

// DELETE
router.delete('/prestamo/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM prestamo WHERE id = ?'

  try {
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo eliminar el préstamo' })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Préstamo no encontrado' })
      }
      res.status(200).json({ mensaje: 'Eliminado', id: Number(id) })
    })
  } catch (error) {
    console.error('Hubo un error en consola: ' + error)
  }
})

module.exports = router
