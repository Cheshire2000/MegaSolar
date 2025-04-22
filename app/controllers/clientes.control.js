// clientes.control.js
import pool from './BdD.js';

export const methods = {
  addCliente: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        nombrec, // Nombre completo del recibo
        Identificador,
        rpu,
        produccionest,
        semana,
        ffc,
        fechac,
        tel,
        email,
        direccion,
        detalles
      } = req.body;

      // Mapeo de nombres a lo que espera la BD
      const nombreRecibo = nombrec;
const identificador = Identificador;
const produccionEstimada = parseInt(produccionest);
const semanaRecoleccion = parseInt(semana);
const frecuenciaFacturacion = ffc;
const fechaInstalacion = fechac;
const telefono = tel;
const correo = email;

// ✅ Validación de enteros
if (isNaN(produccionEstimada) || isNaN(semanaRecoleccion)) {
  return res.status(400).json({ error: "Producción estimada o semana de recolección no son válidos (deben ser números)" });
}

await pool.query(`
  INSERT INTO Clientes (
    Nombre_C, Apellido_C, Nombre_Recibo, Identificador, 
    RPU, Produccion_Estimada, Semana_Recoleccion, Frecuencia_Facturacion,
    Fecha_Instalacion, Tel, Correo, Direccion, Detalles
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
`, [
  nombre,
  apellido,
  nombreRecibo,
  identificador,
  rpu,
  produccionEstimada,
  semanaRecoleccion,
  frecuenciaFacturacion,
  fechaInstalacion,
  telefono,
  correo,
  direccion,
  detalles
]);

      res.status(200).json({ message: 'Cliente agregado correctamente' });
    } catch (error) {
      console.error('Error al agregar cliente:', error);
      res.status(500).json({ error: 'Error al agregar cliente' });
    }
  }
};