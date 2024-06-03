import express from 'express';
import axios from 'axios';

class Requests {
    async sendRequest(body, options) {
        try {
            const url = `${options.hostname}`;
            const response = await axios.post(url, body)
            console.log(`Status Code: ${response.status}`);
            console.log('Response Body:', response.data);
            return response.data;
        } 
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error Response Status:', error.response.status);
                console.error('Error Response Headers:', error.response.headers);
                console.error('Error Response Data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error Request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error Message:', error.message);
            }
            console.error('Error Config:', error.config);
            throw error;
        }
    }

    options(hostname, method, headers) {
        return {
            hostname: hostname,
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
