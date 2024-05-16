const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send the response body "Hello, World!"
  res.end('Hello, World!\n');
});

// Define the port number
const port = 8000;

// Start listening for connections on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

