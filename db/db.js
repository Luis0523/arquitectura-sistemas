const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


console.log(process.env.DB_HOST)
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la DB:', err);
    process.exit(1);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = db