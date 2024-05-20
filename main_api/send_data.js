export const send_request = (body, options)
    const req = http.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);
        // Store the response data
        let data = '';
        // Append chunks of data to the 'data' variable
        res.on('data', (chunk) => {
        data += chunk;
        });
        // Log the complete response data
        res.on('end', () => {return data;
        console.log('Response Body:', data);
        });
        //Handle errors
        req.on('error', (error) => {
            console.error('Error:', error);
        });
        if options[""]
        // End the request
        req.end();
    return data;
});
  
export const options = (hostname, port, path, method, headers) => {
    const options = {
        hostname: hostname,
        port: port,
        path: path,
        method: method,
        headers: headers
      };

}