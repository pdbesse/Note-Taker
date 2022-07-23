// require express
// require fs
// require path
// require db.json
// set express()
// set PORT
// allow access to static
// URL encoded and json?
// 
// create HTML routes for GET /notes (notes.html)and GET* (index.html)
// create API route for GET /api/notes (read db.json; return notes as JSON)
// create API route for POST /api/notes (receive new note to save on request
// body, add it to db.json, and return new note to client)
// for POST, add unique ID# to each note (any npm packages to do this)
// DELETE /api/notes/:id as bonus
// DELETE should receive query parameter (ID); read all notes in db.json, 
// corresponding note, and rewrite notes to db.json

const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

// creates instance of express
const app = express();
// sets PORT
const PORT = 3333;

// allow access to /public
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to GET api/notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(`${req.method} request received; returning saved notes`);
});

// route to POST api/notes
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received; posting your note`);
});

// route to GET public/notes.html
app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, 'public/notes.html'));
    console.log('notes.html request received');
});

// route to GET public/index.html
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'public/index.html'));
    console.log('index.HTML request received');
});

// sets PORT listen
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
