const http = require('http');
//Recibo una reequest del back, envio una request a la api de conexion correspondiente, api de conexion envía al proyecto.
//El proyecto responde, api de conexion responde y esta api responde al back.
//Tipo de datos, que haria conexion, distintos archivos
received_data = "";
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send the response body "Hello, World!"
  res.end(received_data = req.body);
});

// Define the port number
const port = 3001;

// Start listening for connections on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});


const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET'
  };
  const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
  
    // Store the response data
    let data = '';
  
    // Append chunks of data to the 'data' variable
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    // Log the complete response data
    res.on('end', () => {
      console.log('Response Body:', data);
    });
  });
  
  // Handle errors
  req.on('error', (error) => {
    console.error('Error:', error);
  });
  
  // End the request
  req.end();
