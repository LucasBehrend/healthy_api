import express from "express";
import requests from "./receive_and_send_express.js";

const app = express();
app.use(express.json());

const port = 3000;
const request = new requests();

app.post('/', async (req, res) => {
    try {
        const receivedData = req.body;
        const options = request.options("localhost", 8000, "/", "POST", {"Content-Type": "application/json"})
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
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
// const options = request.options("localhost", 8000, "/", "POST", JSON.stringify({'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}));
// console.log("2");
// const send_request_to_connection = request.send_request(data, options);
// console.log("3");