import express from 'express';
import axios from 'axios';

class Requests {
    async sendRequest(body, options) {
        try {
            const url = `${options.hostname}${options.path}`;
            const response = await axios.post(url, body)
            console.log(`Status Code: ${response.status}`);
            console.log('Response Body:', response.data);
            return response.data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    options(hostname, path, method, headers) {
        return {
            hostname: hostname,
            path: path,
            method: method,
            headers: headers
        };
    }

    async receive_data(port, options) {
        const app = express();
        app.use(express.json()); // Middleware to parse JSON bodies

        // app.post('/', async (req, res) => {
        //     const receivedData = req.body;
        //     res.status(200);
        //     res.send("Se recibió la request.");
        //     console.log(receivedData);
        //     console.log("receive data")
        // });

    }
    listen(port)
    {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    };
}

export default Requests;
