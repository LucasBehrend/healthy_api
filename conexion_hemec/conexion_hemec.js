import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';

const app = express();
const request = new Requests();
// Middleware para parsear JSON
app.use(express.json());

/*
DATOS:
ARCHIVO
NOMBRE
APELLIDO
EDAD
DNI
SEX0
PESO
ALTURA
HTA
DIABETES (TIPO)
DISLIPEMIA (SI/NO)
FUMADOR (SI/NO/EX)
CREATININA
IMS (const imc = peso / ((altura / 100) * (altura / 100));
            form.set('imc', imc);

            if (imc <= 18.5) {
                form.set('obesidad', 'Bajo');
            }
            else if (imc <= 24.9) {
                form.set('obesidad', 'Normal');
            }
            else if (imc <= 29.9) {
                form.set('obesidad', 'Sobrepeso');
            }
            else if (imc <= 34.9) {
                form.set('obesidad', 'Obesidad I');
            }
            else if (imc <= 39.9) {
                form.set('obesidad', 'Obesidad II');
            }
            else {
                form.set('obesidad', 'Obesidad III');
            }
)
*/


const port = 7000;

app.post('/', async (req, res) => {
  const url =  "https://hamec.vercel.app/";
  const receivedData = req.body;
  const options = request.options(url, "ejemplo", "POST", {"Content-Type": "application/json"})
  const response = await request.sendPostRequest(receivedData, options);
  
  res.status(200);
  console.log("esto es 2", response);
  res.send(response);
});



// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;