const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 12021980,
    port: 5432,
})

module.exports = pool;