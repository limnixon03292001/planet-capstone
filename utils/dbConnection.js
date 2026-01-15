const { Pool } = require("pg");

//migrate to ipv6 connection string as per Supabase.

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT_DB,
// });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
