const Pool = require('pg').Pool


const pool = new Pool({
    user: "pi",
    password: "systemx",
    host: "192.168.31.114",
    port: 5432,
    database: "pi"
})
module.exports = pool

