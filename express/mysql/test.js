const mysql = require('mysql');

const credentials = require('./credentials');

let con = mysql.createConnection(credentials);

con.connect((err) => {
    if (err) {
        throw err;
    }
});

con.query('SELECT * FROM FSA_USERS', (err, results, fields) => {
    console.log(results);
});
