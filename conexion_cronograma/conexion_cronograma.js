import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';
import cors from 'cors';

app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: '*'

})
);
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
  console.log(data);
  data.forEach(turno => {
    turnos.push({paciente: turno.paciente,medico: turno.medico, fecha: turno.fecha, hora: turno.hora});
  });
  const options = request.options(url, "", "POST", {"Content-Type": "application/json"})
  const response = await request.sendPostRequest(turnos, options);
  
  res.status(200);
  console.log("esto es 2", response);
  res.send(response);
});
// endpoint get para recibir turnos, enviar parametros en la ruta 
app.get('/turnos/:paciente', async (req,res) => {
  console.log("ok");
  const paciente = req.params.paciente;
  const path = url + paciente;
  console.log(path, url + paciente);
  try{
    const response = await request.sendGetRequest(path);
    console.log(response);
    res.send(response);
  }
  catch (error){
    console.log(error.message);
  }
})
// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;