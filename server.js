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
// require node.js crypto module
const crypto = require('crypto');
const { allowedNodeEnvironmentFlags } = require('process');
// run crypto.randomUUID to generate random id tags
const randNoteID = crypto.randomUUID({ disableEntropyCache: true });

// console.log(randNoteID);

// creates instance of express
const app = express();
// sets PORT
const PORT = 3333;

// allow access to /public
app.use(express.static('public'));

// middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to GET public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // console.log('index.HTML request received');
});

// route to GET public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
    // console.log('notes.html request received');
});

// route to GET api/notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // console.log(`${req.method} request received; returning saved notes`);
});

// route to POST api/notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // newNote structure; assigns random id
    const newNote = {
        title,
        text,
        id: randNoteID
    }
    // console.log(title, text);
    // add newNote to notes database
    notes.push(newNote);

    // write file db.json from notes database
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.json(newNote);
            console.log('New note added');
        };
    });
});

// delete note
app.delete('/api/notes/:id', (req, res) => {
    // read notes database array
    fs.readFile(path.join(__dirname, '.db/db.json'), 'utf8', (err, data) => {
        // assign request id parameter to variable
        const nixID = req.params.id;

        // iterates through the notes database array
        for (let i = 0; i < notes.length; i++) {
            // assign examined object in database to nixNote
            const nixNote = notes[i];
            // if examined object's id key property == request id parameter
            if (nixNote.id == nixID) {
                // splice the object from the notes database array
                notes.splice([i], 1);
            };
        };
        // write new file from notes database array after note has been deleted; overwrites old notes database array file
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Note deleted');
            };
        });
        res.json(notes);
    })
});

// route to GET public/index.html from *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // console.log('index.HTML request received');
});

// sets PORT listen
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
