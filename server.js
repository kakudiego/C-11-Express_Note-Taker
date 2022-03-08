// server config/setup - require files/modules
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public')); // loads static resources (HTML, CSS, JS)

// read from db.json
let notes = fs.readFileSync('./db/db.json'); // 3 hours to 'fix', no clue why the error (ENOENT)
notes = JSON.parse(notes);
// console.log(notes);

// routes
// Homepage
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html'))); // show homepage
// Notes page
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, '/public/notes.html'))); // show notes page

// API view of notes
app.get('/api/notes', (request, response) => response.json(notes)); // sends json data of notes upon request

// add data to notes
app.post('/api/notes', (request, response) => {
  //add object to notes array
  const newNote = request.body;

  // todo add ID to the new note
  // function located in the index.js

  //log new note data with title-text-id in console
  console.log('New Note: ', newNote);

  //add data to notes array
  notes.push(newNote);

  response.end();
});

// delete route
app.delete('/api/notes/:id', (request, response) => {
  const selectedNoteID = request.params.id;
  console.log(`Note ${selectedNoteID} deleted!`);

  // //remove item from notes array
  // notes is an array, filter will loop into notes array, looking for the Id of that note. filterDOCS!
  notes = notes.filter((note) => note.id != selectedNoteID);

  response.end();
});

// 'start the local server'
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));
