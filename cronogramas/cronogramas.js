import express from 'express'
import fs from 'fs'
import { createObjectCsvWriter } from 'csv-writer';
import { MongoClient, ServerApiVersion } from 'mongodb'
const app = express();

const uri = "mongodb+srv://lucasbehrend2006:lucas2006@turnos-medicos-healthy.hs0fzoa.mongodb.net/?retryWrites=true&w=majority&appName=turnos-medicos-healthy";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
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
  try {
    await client.connect();
    const db = client.db("sample_guides");
    const coll = db.collection("turnos");
    const result = await coll.insertMany(docs);
  }
  catch{}
  res.send('Turno añadido.');
});

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;