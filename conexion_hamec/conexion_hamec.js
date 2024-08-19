import express from 'express';
import Requests from '../main_api/receive_and_send_express.js';
import multer from 'multer';

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
        return 'sexo', 'M';
    }    
    else{
        return('sexo', 'F');
    }
}

function check_hta (hta){
    if(hta.toLowerCase()[0] == 's'){
        return ('hta', 'true');
    }
    else{
        return ('hta', 'false');
    }
}

function check_diabetes(diabetes){
    if(diabetes[diabetes.length - 1] == '1'){
        return ('diabetes', 'Tipo 1');
    }
    else if (diabetes[diabetes.length - 1] == '2'){
        return ('diabetes', 'Tipo 2');
    }
    else {
        return ('diabetes', 'No');
    }
}

function check_dislipemia(dislipemia){
    if (dislipemia.toLowerCase()[0] == 's'){
        return ('dislipemia', 'true');
    }
    else{
        return ('dislipemia', 'false');
    }
}

function check_fumador (fumador){
    if (fumador.toLowerCase()[0] == 's'){
        return ('fumador', 'Si');
    }
    else if (fumador.toLowerCase()== 'ex'){
        return ('fumador', 'Ex');
    }
    else{
        return('fumador', 'No');
    }
}

function check_imc(imc){
    if (imc <= 18.5) {
        return('obesidad', 'Bajo');
    }
    else if (imc <= 24.9) {
        return('obesidad', 'Normal');
    }
    else if (imc <= 29.9) {
        return('obesidad', 'Sobrepeso');
    }
    else if (imc <= 34.9) {
        return('obesidad', 'Obesidad I');
    }
    else if (imc <= 39.9) {
        return('obesidad', 'Obesidad II');
    }
    else {
        return('obesidad', 'Obesidad III');
    }
}



const port = 7000;

app.post('/', upload.single('file'), async (req, res) => {
    console.log("hoasoddasas");
    const url =  "https://hamec.vercel.app/";
    // const file = req.file;
    // if (!file) {
    //     return res.status(400).send('No file uploaded.');
    // }
    const body = req.body;
    const options = request.options(url, "ejemplo", "POST", {"Content-Type": "multipart/form-data"})
    const imc = body.peso / ((body.altura / 100) * (body.altura / 100));
    let formData = new FormData();
    // formData.set('file', file);
    formData.set('nombre', body.nombre);
    formData.set('apellido', body.apellido);
    formData.set('edad', body.edad);
    formData.set('dni', body.dni);
    formData.set(check_sexo(body.sexo));
    formData.set('peso', body.peso);
    formData.set('altura', body.altura);
    formData.set(check_hta(body.hta));
    formData.set(check_diabetes(body.diabetes));
    formData.set(check_dislipemia(body.dislipemia));
    formData.set(check_fumador(body.fumador));
    formData.set('creatinina', body.creatinina);
    formData.set('imc', imc);
    formData.set(check_imc(imc));
    res.status(200);
    console.log(formData);
    // const response = await request.sendPostRequest(formData, options);
    res.send(response);
});



// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
export default app;