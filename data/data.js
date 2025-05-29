const mySql = require('mysql2');

const connection= createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'Spartako1992!',
    database: 'db_movie'
})
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
    } else {
        console.log('Connesso al database MySQL');
    }
})


 module.exports = connection