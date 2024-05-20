import http from 'http';

class requests {
    send_request(body, options) {
        const req = http.request(options, (res) => {
            console.log(`Status Code: ${res.statusCode}`);
            // Store the response data
            let data = '';
            // Append chunks of data to the 'data' variable
            res.on('data', (chunk) => {
                //data += chunk;
                data = 1;
            });
            // Log the complete response data
            res.on('end', () => {
                console.log('Response Body:', data);
                return data; 
            });
            //Handle errors
            req.on('error', (error) => {
                console.error('Error:', error);
            });
            if (options[method] == "POST") {
                req.write(body);
            }
            // End the request
            req.end();
        });
    } 

    options(hostname, port, path, method, headers) {
        const options = {
            hostname: hostname,
            port: port,
            path: path,
            method: method,
            headers: headers
        };
        return options;
    } 

    receive_data(port, options) {
        let received_data = "";
        const server = http.createServer((req, res) => {
            // Set the response HTTP header with HTTP status and Content type
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            received_data = req.body
            res.end(this.send_request(received_data, options));
        });
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
        return received_data;
    } 
};
export default requests;
