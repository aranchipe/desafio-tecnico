const axios = require('axios')

const api = axios.create({
    baseURL: 'http://universities.hipolabs.com',
    headers: {
        'Content-Type': 'application/json',
    }
});

module.exports = api