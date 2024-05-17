const http = require('http');
//Recibo una reequest del back, envio una request a la api de conexion correspondiente, api de conexion envía al proyecto.
//El proyecto responde, api de conexion responde y esta api responde al back.
//Tipo de datos, que haria conexion, distintos archivos
const receive_data = () => {
  received_data = "";
  const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body "Hello, World!"
    res.end(received_data = req.body);
  });
  return received_data;
}

// Define the port number

const listen = (port) => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
  });
}
// Start listening for connections on port 3000

