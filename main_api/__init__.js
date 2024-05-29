import express from "express";
import requests from "./receive_and_send_express.js";

const app = express();
app.use(express.json());

const port = 3000;
const request = new requests();

app.post('/', async (req, res) => {
    try {
        const receivedData = req.body;
        let path = null;
        const url =  "https://healthy-api-amber.vercel.app/"
        console.log(receivedData.value);
        switch (receivedData.value)
        {
            case 0: 
                path = "/conexion_ejemplo";
                console.log(0);
                break;
            case 1: 
                path = "/conexion_cronograma";
                console.log(1);
                break;
        }
        const options = request.options(url, path, "POST", {"Content-Type": "application/json"})
        const response = await request.sendRequest(receivedData, options);
        
        res.status(200);
        console.log("esto es ", response);
        res.send(response);
    }
    catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
      }
});
app.get('/', (req, res) =>
    res.send("HOLA VERCEL"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
module.exports = app;