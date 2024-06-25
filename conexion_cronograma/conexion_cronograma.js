import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';

const app = express();
const request = new Requests();
// Middleware para parsear JSON
app.use(express.json());

// Define el número de puerto
const port = 8000;
console.log("conexion crono");
const url =  process.env.CRONOGRAMA;
// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  let turnos = [];
  let data = req.body;
  Object.values(data.turnos).forEach(turno => {
    turnos.push({paciente: turno.paciente,medico: turno.medico, fecha: turno.fecha, hora: turno.hora});
  });
  const options = request.options(url, "", "POST", {"Content-Type": "application/json"})
  const response = await request.sendRequest(turnos, options);
  
  res.status(200);
  console.log("esto es 2", response);
  res.send(response);
});
// endpoint get para recibir turnos, enviar parametros en la ruta 
app.get('turnos', async (req,res) => {
  const options = request.options(url, "", "GET");
  const response = await request.sendPostRequest()

})
// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;