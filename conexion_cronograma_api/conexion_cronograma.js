import express from 'express';
<<<<<<< HEAD
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const receivedData = req.body;
  console.log("Llego")
  res.status(200);
  res.send("Se recibió la request.");
});
// Define the port number
const port = 8000;

// Start listening for connections on port 3000
=======
import Requests from '../main_api/receive_and_send_express.js';

const app = express();
const request = new Requests();
// Middleware para parsear JSON
app.use(express.json());

// Define el número de puerto
const port = 8000;
console.log("conexion crono");
// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  console.log("post cc");
  const url =  "healthy-api-amber.vercel.app/"
  const receivedData = req.body;
  const options = request.options(url, "cronograma", "POST", {"Content-Type": "application/json"})
  const response = await request.sendRequest(receivedData, options);
  
  res.status(200);
  console.log("esto es 2", response);
  res.send(response);
});

// Inicia el servidor y escucha en el puerto definido
>>>>>>> 37b6796030741178424a16ba1bd6ad975ee91f8b
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
module.exports = app;