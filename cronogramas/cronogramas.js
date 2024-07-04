import express from 'express'
import fs from 'fs'
import { MongoClient, ServerApiVersion } from 'mongodb'
const app = express();
import cors from 'cors';

app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: '*'

})
);

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

// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  let data = req.body;
  console.log("data: ", data);
  try {
    await client.connect();
    const db = client.db("sample_guides");
    const coll = db.collection("turnos");
    await coll.insertMany(data);
  }
  catch (error){
    console.log("Error: ", error.message);
  }
  res.send('Turno añadido.');
});

app.get('/:paciente', async (req, res) => {
  console.log("ok");
  const paciente = req.params.paciente;
  const db = client.db("sample_guides");
  const coll = db.collection("turnos");
  const results = await coll.find().toArray();
  res.send(results);
})
// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;