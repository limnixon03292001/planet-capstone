const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'containers-us-west-29.railway.app',
    database: 'railway',
    password: 'wOZ4pKJSh3UkeSIpJyii',
    port: 6926,
});

module.exports = pool;