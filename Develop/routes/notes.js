const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

notes.get('/', (req, res) =>{
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in saving note.');
  }
});

notes.delete('/:id',(req,res)=>{
   fs.readFile('./db/db.json','utf8',(err,data)=>{
    writeToFile('./db/db.json',JSON.parse(data).filter(entry=> entry.id !== req.params.id))
   });
   res.send(console.log("db.json file re-written"))
});

module.exports = notes;