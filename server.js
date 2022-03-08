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
let notes = fs.readFileSync('./db/db.json');
notes = JSON.parse(notes);
// console.log(notes);

// routes
// Homepage
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html'))); // sends html file upon request
// Notes page
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, '/public/notes.html'))); // sends html file upon request

// API view of notes
app.get('/api/notes', (request, response) => response.json(notes)); // sends json data of notes upon request

// add data to notes
app.post('/api/notes', (request, response) => {
  //add object to notes array
  const newNote = request.body;

  // todo add ID to the new note

  //log data in console
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

// makes app go
app.listen(PORT, () => console.log(`Note Taker app listening on PORT: ${PORT}`));
