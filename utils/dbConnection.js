const { Pool } = require('pg');

//migrate to ipv6 connection string as per Supabase.

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT_DB,
// });

const connectionString = `postgres://postgres.bmwildaasdfcckoxiotp:${process.env.PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`

const pool = new Pool({
    connectionString,
});

module.exports = pool;