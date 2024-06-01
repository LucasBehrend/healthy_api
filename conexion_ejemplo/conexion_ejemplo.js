import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';

const app = express();
const request = new Requests();
// Middleware para parsear JSON
app.use(express.json());

// Define el número de puerto
const port = 9000;
console.log("conexion ejemplo");
// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  console.log("post ce");
  const url =  "https://ejemplo-n0de.onrender.com"
  const receivedData = req.body;
  const options = request.options(url, "ejemplo", "POST", {"Content-Type": "application/json"})
  const response = await request.sendRequest(receivedData, options);
  
  res.status(200);
  console.log("esto es 2", response);
  res.send(response);
});

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;