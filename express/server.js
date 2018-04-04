//---------------------------------
//- Built-In Node Module Requires -
//---------------------------------
const path = require('path');

//------------------------
//- Node Module Requires -
//------------------------
const express = require('express');

//------------------
//- Local Requires -
//------------------
const credentials = require('./mysql/credentials');
const queries = require('./mysql/queries');

//---------------------
//- Additional Routes -
//---------------------
const users = require('./routes/users.js');

//--------------------
//- Script Constants -
//--------------------
const app = express();
const hostname = 'localhost';
const port = 8080;
const static_path = path.join(__dirname, '../static');

//-------------------
//- Server Listener -
//-------------------
app.listen(port, () => {
    console.log(`Listening at "${hostname}:${port}"`);
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

// Define the request for the webcomponents
app.route('/webcomponents.js')
.get((req, res) => {
    res.sendFile(path.join(__dirname,
            '../bower_components/webcomponentsjs/webcomponents-lite.js'));
})
.all(badRequest);

// Include the users routes
app.use(users);

// All other routes
app.route('*')
// Define get requests to 404
.get((req, res) => {
    res.status(404).send('Page not Found');
})
.all(badRequest);

