import { receive_data, listen } from receive_data.js
import { send_request } from "./send_data"

const listen_port = 3000;
listen(listen_port);
const received_data = received_data(listen_port);
switch (received_data){
    case 1: send_request("localhost", 8000, "/", "POST", JSON.stringify{'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(received_data)})
}