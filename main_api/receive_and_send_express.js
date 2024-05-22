import express from 'express';
import axios from 'axios';

class Requests {
    async sendRequest(body, options) {
        try {
            const url = `http://${options.hostname}:${options.port}${options.path}`;
            switch(options.method.toLowerCase()){
                case "post":
                    axios.post(url, {body: options.body});
                case "get":
                    axios.get(url)

            };
            
            console.log(`Status Code: ${response.status}`);
            console.log('Response Body:', response.data);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    options(hostname, port, path, method, headers) {
        return {
            hostname: hostname,
            port: port,
            path: path,
            method: method,
            headers: headers
        };
    }

    receiveData(port, options) {
        const app = express();
        app.use(express.json()); // Middleware to parse JSON bodies

        app.post('/', async (req, res) => {
            const receivedData = req.body;
            try {
                const responseData = await this.sendRequest(receivedData, options);
                res.status(200).send(responseData);
            } catch (error) {
                res.status(500).send('Error sending request');
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    }
}

export default Requests;
