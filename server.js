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
// express route stuff
const grades = require('./routes/grades');

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

//------------
//- App Uses -
//------------
// Static Files
app.use(express.static(static_path, { dotfiles: 'ignore' }));
// Grades
app.use(grades);

//-----------------
//- Set up Routes -
//-----------------
// All other routes
app.route('*')
// Define get requests to 404
.get((req, res) => {
    res.status(404).send('Page not Found');
})
// Define all other requests for the route to 500
.all((req, res) => {
    res.status(400).send('Bad Request');
});
