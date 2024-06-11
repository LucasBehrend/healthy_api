import express from 'express'
import fs from 'fs'
import { createObjectCsvWriter } from 'csv-writer';
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Define el número de puerto
const port = 6000;

const path_csv = "cronogramas/turnos.csv";
const csvWriter = createObjectCsvWriter({
  path: path_csv,
  header: [
      { id: 'paciente', title: 'Paciente' },
      { id: 'medico', title: 'Medico' },
      { id: 'fecha', title: 'Fecha' },
      { id: 'hora', title: 'Hora' }
  ],
  append: true // Añadir registros sin sobrescribir
});
// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  let data = req.body;
  await csvWriter.writeRecords(data);
  res.send('Turno añadido.');
});

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;