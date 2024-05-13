const http = require('http');
//Recibo una reequest del back, envio una request a la api de conexion correspondiente, api de conexion envía al proyecto.
//El proyecto responde, api de conexion responde y esta api responde al back.
const options = {
    hostname: 'localhost',
    port: 3000,
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