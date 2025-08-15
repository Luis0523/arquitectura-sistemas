const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json());


const autorRouters = require('./routes/autor.routes')
const personaRouters = require('./routes/persona.routes')
const libroRouters = require('./routes/libro.routes')
const libroautorRouters = require('./routes/libroautor.routes')
const prestamoRouters = require('./routes/prestamo.routes')

app.get('/', (req, res) => {
  const mensaje = {
    base: "Hola mundo",
    codigo: 200,
    clase: "6A_S"
  }
  res.send({mensajeBase: mensaje});
});

//mandar a traer las rutas de autores. 

app.use('/', autorRouters)
app.use('/', personaRouters)
app.use('/', libroRouters)
app.use('/', libroautorRouters)
app.use('/', prestamoRouters)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
