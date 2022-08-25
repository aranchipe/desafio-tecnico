const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'aranchipe1998',
        database: 'apiuniversidades',
        /* ssl: {
            rejectUnauthorized: false
        } */
    }
});

module.exports = knex;
