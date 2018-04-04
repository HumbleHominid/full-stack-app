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

// Server Error
function serverError(res) {
    res.status(500).send('Internal Server Error');
}

// Actually handles connecting to the database and running the query
function handleQuery(req, res, query, args = [ ]) {
    let con = mysql.createConnection(credentials);

    con.connect((err) => {
        if (err) {
            serverError(res);

            return;
        }
    });

    con.query(query, args, (err, results, fields) => {
        if (err) {
            serverError(res);

            return;
        }

        res.status(200).json(results);
    });

    con.end();
}

// Define the 'users/byID/:id' route
router.route('/users/byID/:id')
// Define get requests for the route
.get((req, res) => {
    // Handle the query using the 'byID' query in 'queries.users'
    handleQuery(req, res, queries.users.byID, [ req.params.id ]);
})
// Define all other requests for the route to 500
.all(badRequest);

// Define the 'users/byFFame/:fName' route
router.route('/users/byFName/:fName')
// Define get requests for the route
.get((req, res) => {
    // Handle the query using the 'byFName' query in 'queries.users'
    handleQuery(req, res, queries.users.byFName, [ req.params.fName ]);
})
// Define all other requests for the route to 500
.all(badRequest);

// Define the 'users' route
router.route('/users')
// Define the get requests for the route
.get((req, res) => {
    handleQuery(req, res, queries.users.all);
})
// Define all other requests for the route to 500
.all(badRequest);

module.exports = router;
