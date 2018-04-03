//------------------------
//- Node Module Requires -
//------------------------
const mysql = require('mysql');
const express = require('express');

//------------------
//- Local Requires -
//------------------
// mysql stuff
const credentials = require('../mysql/credentials');
const queries = require('../mysql/queries');

//--------------------
//- Script Constants -
//--------------------
const router = express.Router();

//----------------
//- Route Set up -
//----------------
// Bad request
function badRequest(req, res) {
    res.status(400).send('Bad Request');
}

function handleQuery(req, res, query) {
    let con = mysql.createConnection(credentials);

    con.connect((err) => {
        res.status(500).send();
    });

    con.query(query, (err, results, fields) => {
        if (err) {
            res.status(500).send();

            return;
        }

        res.status(200).json(results);
    });

    con.end();
}

// Define the '/grades/:id' route
router.route('/grades/:id')
// Define get requests for the route
.get((req, res) => {
    handleQuery(req, res, queries.grades.byID(req.params.id));
})
// Define all other requests for the route to 500
.all(badRequest);

// Define the '/grades/' route
router.route('/grades/')
// Define the get requests for the route
.get((req, res) => {
    handleQuery(req, res, queries.grades.all());
})
// Define all other requests for the route to 500
.all(badRequest);

module.exports = router;
