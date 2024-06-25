import express from "express";
import requests from "./receive_and_send_express.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

const port = 3000;
const request = new requests();
console.log("init");
app.post('/', async (req, res) => {
    //Revisar si es mejor dos rutas o el switch
    console.log("Post");
    try {
        const receivedData = req.body;
        let path = null;
        let url =  "";
        switch (receivedData.value)
        {
            case "ejemplo": 
                url = process.env.CONEXION_EJEMPLO;
                console.log(url);
                break;
            case "turno": 
                url = process.env.CONEXION_CRONOGRAMA;
                console.log(1);
                break;
        }
        const options = request.options(url, "POST", {"Content-Type": "application/json"})
        const response = await request.sendPostRequest(receivedData, options);
        
        res.status(200);
        console.log("esto es ", response);
        res.send(response);
    }
    catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
}) 
app.get('/turnos', (req, res) => {
    const url = process.env.CONEXION_CRONOGRAMA;
    //completar para hacer un get a conexion_cronogramas
    const options = request.options(url,)
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
export default app;