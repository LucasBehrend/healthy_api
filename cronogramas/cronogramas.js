import express from 'express'
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Define el número de puerto
const port = 6000;

// Define una ruta para la URL raíz ("/") con método POST
app.post('/', async (req, res) => {
  let data = req.body;
  console.log(data);
  res.send(data);
});

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;