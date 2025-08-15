const express = require('express');
const db = require('../db/db')  //CONEXION A BASE DE DATOS


const router = express.Router()

router.get('/autores', (req, res) => {
  db.query('SELECT * FROM autor', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener autores' });
    }
    res.json(results);
  });
});



router.post('/autores', (req, res) => {
  const { nombre, estado } = req.body;
  const sql = 'INSERT INTO autor (nombre, estado) VALUES (?, ?)';
  db.query(sql, [nombre, estado], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar autor' });
    }
    res.status(201).json({ id: result.insertId, nombre, estado });
  });
});


router.put('/autores/:id', (req, res) => {
  const id = req.params.id
  const { nombre, estado } = req.body;
  const sql = 'UPDATE autor set nombre = ?, estado = ? where id = ?'
  try {
    db.query(sql, [nombre, estado, id], (err, result) => {
      if (err) {
      return res.status(500).json({ error: 'Error al actualizar autor' + err });
    }
      res.status(200).json({ mensaje: "Actualizado", resultado: result });
    })
  } catch (error) {
    console.error("Error al actualizar registro: " + error)
  }
})

// Eliminar un autor
router.delete('/autores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM autor WHERE id = ?';

  try {
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar autor' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Autor no encontrado' });
      res.status(200).json({ mensaje: 'Eliminado', id: Number(id) });
    });
  } catch (error) {
    console.error('Error al eliminar registro: ' + error);
    res.status(500).json({ error: 'Error interno' });
  }
});



module.exports = router