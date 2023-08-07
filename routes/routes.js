const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')

module.exports = (app) => {

// return the notes in db.json file
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

// saves new note in db.json file  
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });

// delete only the note with the id in the query paramater
  app.delete('/api/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    let deleteNote = db.filter(note => note.id !== req.params.id);

    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
    
  })


//return notes.html
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

//return homepage (index.html)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};