const https = require('https');
const axios = require('axios').default;

const instance = axios.create({
    // httpsAgent: new https.Agent({
    //     rejectUnauthorized: false
    // }),
    // validateStatus: false,
    baseURL: 'https://reqres.in/',
});
module.exports = instance;