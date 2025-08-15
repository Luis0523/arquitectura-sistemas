const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json());




db.connect(err => {
  if (err) {
    console.error('Error al conectar a la DB:', err);
    process.exit(1);
  } else {
    console.log('Conectado a la base de datos');
  }
});


app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'nombre y correo son obligatorios' });
  }
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(sql, [nombre, correo], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar usuario' });
    res.status(201).json({ id: result.insertId, nombre, correo });
  });
});


app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
});


app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
});


app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'nombre y correo son obligatorios' });
  }

  const sql = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?';
  db.query(sql, [nombre, correo, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: Number(id), nombre, correo });
  });
});





app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send(); // No Content
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
