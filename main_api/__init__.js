import { receive_data, listen } from "./receive_data.js";
import { requests } from "./send_data.js";

const listen_port = 3000;
const data = requests.receive_data(listen_port);
switch (data){
    case 1: 
        send_request("localhost", 8000, "/", "POST", JSON.stringify({'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}))
    defalult:
        console.log("No entra en case 1");
}