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

const app = express();
const PORT = 3333;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})