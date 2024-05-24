import express from 'express';
import axios from 'axios';

class Requests {
    async sendRequest(body, options) {
        try {
            const url = `http://${options.hostname}:${options.port}${options.path}`;
            switch(options.method.toLowerCase()){
                case "post":
                    await axios.post(url, {body: body})
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error)
                    {
                        console.log(error);
                    });
                case "get":
                    axios.get(url)

            };
            
            console.log(`Status Code: ${response.status}`);
            console.log('Response Body:', response.data);
            console.log(respo)
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async options(hostname, port, path, method, headers) {
        return {
            hostname: hostname,
            port: port,
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
