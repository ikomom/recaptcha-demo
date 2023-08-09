const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

axios.default.defaults.proxy = {
    host: 'localhost',
    port: '7890',
    protocol: 'http',
};

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    headers: {}
};


const handleSend = (req, res) => {
    const secret_key = '6LcJWJEnAAAAABfXxqPNX2B8egr_VLfaOgdaOtja';
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    // const url = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    axios.request({
        method: 'post',
        url
    })
        .then((response) => {
            return res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

    // axios.post(url, {
    //     method: 'post',
    // })
    //     .then(response => response.json())
    //     .then(google_response => res.json({ google_response }))
    //     .catch(error => res.json({ error }));
};

app.post('/send', handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));