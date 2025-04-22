// server.js o app.js
const express = require('express');
const pool = require('./BdD');

const app = express();
app.use(express.json());

// Endpoint de ejemplo para obtener datos
app.get('/newcliente.html', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(4000,() => {
  console.log('Servidor corriendo en http://localhost:4000');
});