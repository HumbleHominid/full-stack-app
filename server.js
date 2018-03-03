//---------------------------------
//- Built-In Node Module Requires -
//---------------------------------
const path = require('path');

//------------------------
//- Node Module Requires -
//------------------------
const mysql = require('mysql');
const express = require('express');

//------------------
//- Local Requires -
//------------------
const credentials = require('./mysql/credentials');
const queries = require('./mysql/queries');

//--------------------
//- Script Constants -
//--------------------
const app = express();
const hostname = 'localhost';
const port = 8080;
const static_path = path.join(__dirname, 'app');

//-------------------
//- Server Listener -
//-------------------
app.listen(port, () => {
    console.log(`Listening at "${hostname}://${port}"`);
});

//--------------------
//- App Static Files -
//--------------------
app.use(express.static(static_path, { dotfiles: 'ignore' }));

//-----------------
//- Set up Routes -
//-----------------
// Bad request
function badRequest(req, res) {
    res.status(400).send('Bad Request');
}

// Define the grades route
app.route('grades/:id')
// Define get requests for the route
.get((req, res) => {
    let con = mysql.createConnection(credentials);

    con.connect();

    if (req.params.id) {
        con.query(queries.grades.byID(req.params.id),
                (err, results, fields) => {
            if (err) {
                res.status(500).send();
            }

            res.status(200).json(results);
        });
    }
    else {
        con.query(queries.grades.all(), (err, results, fields) => {
            if (err) {
                res.status(500).send();
            }

            res.status(200).json(results);
        });
    }

    con.end();
})
// Define all other requests for the route
.all(badRequest);

// All other routes
app.route('*')
// Define get requests to 404
.get((req, res) => {
    res.status(404).send('Page not Found');
})
.all(badRequest);

