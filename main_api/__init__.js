import express from "express";
import { receive_data, listen } from "./receive_data.js";
import requests from "./send_data.js";

const app = express();
app.use(express.json());

const port = 3000;
const request = new requests();

app.post('/', (req, res) => {
    const receivedData = req.body;
    options = requests.options("localhost", )
    request.send_request(receivedData,)
    res.status(200);
    res.send("Se recibió la request.");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
// const options = request.options("localhost", 8000, "/", "POST", JSON.stringify({'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}));
// console.log("2");
// const send_request_to_connection = request.send_request(data, options);
// console.log("3");