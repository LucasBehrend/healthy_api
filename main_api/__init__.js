import express from "express";
import requests from "./receive_and_send_express.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: '*'
    
}));
// app.set("trust proxy", 1);

const port = 3000;
const request = new requests();
console.log("init");
app.use(express.json());
app.post('/turnos', async (req, res) => {
    //Arreglar
    try {
        const url = process.env.CONEXION_CRONOGRAMA;
        const options = request.options(url, "POST", {"Content-Type": "application/json"})
        console.log(req.body);
        const response = await request.sendPostRequest(req.body, options);
        console.log(response);
        res.status(200);
        return res.send(response);
    }
    catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
}) 
app.post('/ejemplo', async (req,res) => {
    try{
        const receivedData = req.body;
        const url = process.env.CONEXION_EJEMPLO;
        const options = request.options(url, "POST", {"Content-Type": "application/json"});
        const response = await request.sendPostRequest(receivedData, options);
        return res.send(response).status(200);
    }catch(error){
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
    

})
app.get('/turnos', async (req, res) => {
    const url = process.env.CONEXION_CRONOGRAMA + 'turnos/';
    // const paciente = req.params.paciente;
    const path = url;
    console.log(path);
    try{
        const response = await request.sendGetRequest(path);
        return res.send(response);
    }
    catch (error){
        console.log(error.message);
    }
});

app.post('/electrocardiograma', async (req,res) => {
    try{
        const receivedData = req.body;
        const url = process.env.CONEXION_HEMEC;
        const options = request.options(url, "POST", {"Content-Type": "application/json"});
        const response = await request.sendPostRequest(receivedData, options);
        return res.send(response).status(200);
    }catch(error){
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
})
app.post('/', async (req,res) => {
    try{
        // let url;
        const tipo = req.body.tipo;
        // switch (tipo){
        //     case "electrocardiograma": url = process.env.CONEXION_HEMEC;
        //     case "turnos": url = process.env.CONEXION_CRONOGRAMA;
        // }
        const url = process.env.CONEXION_HEMEC;
        const options = request.options(url, "POST", {"Content-Type": "application/json"});
        const response = await request.sendPostRequest(receivedData, options);
        return res.send(response).status(200);
    }catch(error){
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
})
app.post('/sz', async (req,res) => {
    res.json("electrocardiograma");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
export default app;