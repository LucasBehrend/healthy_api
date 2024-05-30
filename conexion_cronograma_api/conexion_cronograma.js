import express from 'express';
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
module.exports = app;