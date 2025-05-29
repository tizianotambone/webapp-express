const mySql = require('mysql2');

const connection= mySql.createConnection({
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
connection.connect((err) => {
    if (err) {
        console.log (err);
    } else {
        console.log('Connesso al database MySQL');
    }
})


 module.exports = connection