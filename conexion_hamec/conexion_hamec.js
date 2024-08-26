import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';
import streamifier from 'streamifier';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express();
const request = new Requests();
// Middleware para parsear JSON
app.use(express.json());

/*
DATOS:
ARCHIVO-
NOMBRE-
APELLIDO-
EDAD-
DNI-
SEX0-
PESO-
ALTURA-
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

function check_sexo(sexo){
    if(sexo.toLowerCase()[0]== 'm'){
        return ['sexo', 'M'];
    }    
    else{
        return ['sexo', 'F'];
    }
}

function check_hta (hta){
    if(hta.toLowerCase()[0] == 's'){
        return ['hta', 'true'];
    }
    else{
        return ['hta', 'false'];
    }
}

function check_diabetes(diabetes){
    if(diabetes[diabetes.length - 1] == '1'){
        return ['diabetes', 'Tipo 1'];
    }
    else if (diabetes[diabetes.length - 1] == '2'){
        return ['diabetes', 'Tipo 2'];
    }
    else {
        return ['diabetes', 'No'];
    }
}

function check_dislipemia(dislipemia){
    if (dislipemia.toLowerCase()[0] == 's'){
        return ['dislipemia', 'true'];
    }
    else{
        return ['dislipemia', 'false'];
    }
}

function check_fumador (fumador){
    if (fumador.toLowerCase()[0] == 's'){
        return ['fumador', 'Si'];
    }
    else if (fumador.toLowerCase()== 'ex'){
        return ['fumador', 'Ex'];
    }
    else{
        return ['fumador', 'No'];
    }
}

function check_imc(imc){
    if (imc <= 18.5) {
        return ['obesidad', 'Bajo'];
    }
    else if (imc <= 24.9) {
        return ['obesidad', 'Normal'];
    }
    else if (imc <= 29.9) {
        return ['obesidad', 'Sobrepeso'];
    }
    else if (imc <= 34.9) {
        return ['obesidad', 'Obesidad I'];
    }
    else if (imc <= 39.9) {
        return ['obesidad', 'Obesidad II'];
    }
    else {
        return ['obesidad', 'Obesidad III'];
    }
}



const port = 8000;

app.post('/', upload.single('file'), async (req, res) => {
    console.log("hoasoddasas");
    const url =  "https://hamec.vercel.app/api/estudio?id_institucion=1&id_usuario=1";
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const body = req.body;
    const options = {
        hostname: url,
        method: 'POST'
    }
    // const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
    const sexo = check_sexo(body.sexo);
    const hta = check_hta(body.hta);
    const diabetes = check_diabetes(body.diabetes); 
    const dislipemia = check_dislipemia(body.dislipemia);
    const fumador = check_fumador(body.fumador);
    const fileStream = streamifier.createReadStream(file.buffer);

    // const checked_imc = check_imc(imc);
    let form = new FormData();
    form.append('file', JSON.stringify(fileStream));
    form.append('nombre', body.nombre);
    form.append('apellido', body.apellido);
    //form.append('fechaNacimiento', '1999-09-09');
    form.append('edad', body.edad);
    form.append('dni', body.dni);
    if (body.sexo === 'Masculino' || body.sexo === 'M' || body.sexo === 'm' || body.sexo === 'masculino') {
        form.append('sexo', 'M');
    }
    else {
        form.append('sexo', 'F');
    }
    form.append('peso', body.peso);
    form.append('altura', body.altura);
    //form.append('imc', '30');
    if (body.hta === 'Si' || body.hta === 's' || body.hta === 'S' || body.hta === 'si') {
        form.append('hta', 'true');
    }
    else {
        form.append('hta', 'false');
    }
    //form.append('obesidad', 'Normal');
    if (body.diabetes === '1' || body.diabetes === 'tipo 1' || body.diabetes === 'Tipo 1' || body.diabetes === 'tipo1' || body.diabetes === 'Tipo1' || body.diabetes === 'T1' || body.diabetes === 't1') {
        form.append('diabetes', 'Tipo 1');
    }
    else if (body.diabetes === '2' || body.diabetes === 'tipo 2' || body.diabetes === 'Tipo 2' || body.diabetes === 'tipo2' || body.diabetes === 'Tipo2' || body.diabetes === 'T2' || body.diabetes === 't2') {
        form.append('diabetes', 'Tipo 2');
    }
    else {
        form.append('diabetes', 'No');
    }
    if (body.dislipemia === 'Si' || body.dislipemia === 's' || body.dislipemia === 'S' || body.dislipemia === 'si') {
        form.append('dislipemia', 'true');
    }
    else {
        form.append('dislipemia', 'false');
    }
    if (body.fumador === 'Si' || body.fumador === 's' || body.fumador === 'S' || body.fumador === 'si') {
        form.append('fumador', 'Si');
    }
    else if (body.fumador === 'Ex' || body.fumador === 'ex' || body.fumador === 'EX') {
        form.append('fumador', 'Ex');
    }
    else {
        form.append('fumador', 'No');
    }
    form.append('creatinina', body.creatinina);

    const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
    form.append('imc', imc);

    if (imc <= 18.5) {
        form.append('obesidad', 'Bajo');
    }
    else if (imc <= 24.9) {
        form.append('obesidad', 'Normal');
    }
    else if (imc <= 29.9) {
        form.append('obesidad', 'Sobrepeso');
    }
    else if (imc <= 34.9) {
        form.append('obesidad', 'Obesidad I');
    }
    else if (imc <= 39.9) {
        form.append('obesidad', 'Obesidad II');
    }
    else {
        form.append('obesidad', 'Obesidad III');
    }

    console.log(form);
    console.log(url);
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form)
    }).catch(error => {
        console.log("error", error);
    }
    );
    res.status(200);
    console.log("response", response);
});



// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;
        // const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
        // const sexo = check_sexo(body.sexo);
        // const hta = check_hta(body.hta);
        // const diabetes = check_diabetes(body.diabetes); 
        // const dislipemia = check_dislipemia(body.dislipemia);
        // const fumador = check_fumador(body.fumador);
        // const checked_imc = check_imc(imc);
        // let formData = new FormData();
        // formData.set('file', file.originalname);
        // formData.set('nombre', body.name);
        // formData.set('apellido', body.apellido);
        // formData.set('edad', body.edad);
        // formData.set('dni', body.dni);
        // formData.set(sexo[0], sexo[1]);
        // formData.set('peso', body.peso);
        // formData.set('altura', body.altura);
        // formData.set(hta[0], hta[1]);
        // formData.set(diabetes[0], diabetes[1]);
        // formData.set(dislipemia[0], dislipemia[1]);
        // formData.set(fumador[0], fumador[1]);
        // formData.set('creatinina', body.creatinina);
        // formData.set('imc', imc);
        // formData.set(checked_imc[0], checked_imc[1]);