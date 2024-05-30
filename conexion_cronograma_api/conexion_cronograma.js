import express from 'express';
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

