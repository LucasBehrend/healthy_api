import express from "express";
import requests from "./receive_and_send_express.js";
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
dotenv.config();
const app = express();
app.use(cors({
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    allowedHeaders: '*'
    
}));
// app.set("trust proxy", 1);
const port = 3001;
const request = new requests();
console.log("init");
app.use(express.json());
const upload = multer({ 
    storage: multer.memoryStorage(), // Usando memoryStorage para almacenar archivos en la memoria temporalmente
    limits: { fileSize: 100 * 1024 * 1024},
    json: true
});
async function turnos(req, res){
    let turnos = [];
    let data = req.body;
    console.log("post", data);
    turnos.push({paciente: data.paciente,medico: data.medico, fecha: data.fecha, hora: data.hora});
  
    const options = request.options(url, "", "POST", {"Content-Type": "application/json"})
    const response = await requests.sendPostRequest(turnos, options);
    
    res.status(200);
    console.log("esto es 2", response);
    return res.send(response);
}
async function electrocardiograma(req, res){
    const url =  "https://hamec.vercel.app/api/estudio?id_institucion=1&id_usuario=1";
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const body = req.body;

    // const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
    const sexo = check_sexo(body.sexo);
    const hta = check_hta(body.hta);
    const diabetes = check_diabetes(body.diabetes); 
    const dislipemia = check_dislipemia(body.dislipemia);
    const fumador = check_fumador(body.fumador);
    // const fileStream = new Readable({
    //     read() {
    //       this.push(file.buffer);
    //       this.push(null);
    //     },
    //   });
    const fileStream = streamifier.createReadStream(file.buffer);
    // const checked_imc = check_imc(imc);
    let form = new FormData();
    form.set('file', req.file);
    form.set('nombre', body.nombre);
    form.set('apellido', body.apellido);
    //form.set('fechaNacimiento', '1999-09-09');
    form.set('edad', body.edad);
    form.set('dni', body.dni);
    if (body.sexo === 'Masculino' || body.sexo === 'M' || body.sexo === 'm' || body.sexo === 'masculino') {
        form.set('sexo', 'M');
    }
    else {
        form.set('sexo', 'F');
    }
    form.set('peso', body.peso);
    form.set('altura', body.altura);
    //form.set('imc', '30');
    if (body.hta === 'Si' || body.hta === 's' || body.hta === 'S' || body.hta === 'si') {
        form.set('hta', 'true');
    }
    else {
        form.set('hta', 'false');
    }
    //form.set('obesidad', 'Normal');
    if (body.diabetes === '1' || body.diabetes === 'tipo 1' || body.diabetes === 'Tipo 1' || body.diabetes === 'tipo1' || body.diabetes === 'Tipo1' || body.diabetes === 'T1' || body.diabetes === 't1') {
        form.set('diabetes', 'Tipo 1');
    }
    else if (body.diabetes === '2' || body.diabetes === 'tipo 2' || body.diabetes === 'Tipo 2' || body.diabetes === 'tipo2' || body.diabetes === 'Tipo2' || body.diabetes === 'T2' || body.diabetes === 't2') {
        form.set('diabetes', 'Tipo 2');
    }
    else {
        form.set('diabetes', 'No');
    }
    if (body.dislipemia === 'Si' || body.dislipemia === 's' || body.dislipemia === 'S' || body.dislipemia === 'si') {
        form.set('dislipemia', 'true');
    }
    else {
        form.set('dislipemia', 'false');
    }
    if (body.fumador === 'Si' || body.fumador === 's' || body.fumador === 'S' || body.fumador === 'si') {
        form.set('fumador', 'Si');
    }
    else if (body.fumador === 'Ex' || body.fumador === 'ex' || body.fumador === 'EX') {
        form.set('fumador', 'Ex');
    }
    else {
        form.set('fumador', 'No');
    }
    form.set('creatinina', body.creatinina);

    const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
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
    console.log("form",form);
    const boundary = form.getBoundary();
    try {
      const response = await axios.post(url, form,
        {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        },
        }
    );
      const responseData = await response.json();
      console.log('Response data:', responseData);
      res.send(responseData);
    } catch (error) {
      console.error('Error sending request:', error.message);
      res.send(error.message);
    }
}
async function ejemplo(req,res){
    console.log("post ce");
    const url =  process.env.EJEMPLO;
    const receivedData = req.body;
    const options = request.options(url, "ejemplo", "POST", {"Content-Type": "application/json"})
    const response = await request.sendPostRequest(receivedData, options);
    res.status(200);
    console.log("esto es 2", response);
    res.send(response);
}
app.post('/', async (req,res) => {
    try{
        const tipo = req.body.tipo;
        switch (tipo){
            case "electrocardiograma": 
                electrocardiograma(req, res);
                break;
            case "turnos": 
                turnos(req, res);
                break;
            case "ejemplo":
                ejemplo(req,res);
                break;
        }
        return res.send(response).status(200);
    }catch(error){
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error en el servidor');
    }
})
app.post('/turnos', async (req, res) => {
    //Arreglar
    try {
        const url = process.env.CONEXION_CRONOGRAMA;
        console.log(url);
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
        console.log(response);
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
        
        console.log(url);
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
app.post('/iacm', upload.single('file'), async (req, res) => {
    try{
        const url = 'https://webiacm-five.vercel.app/upload-image';
        const file = req.file;
        let formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(url, formData);
        res.json({response: response});
    }
    catch(error){
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({message: 'Error en el servidor'});
    }

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
export default app;