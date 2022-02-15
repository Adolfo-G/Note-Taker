const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');


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
   const { id } = req.params;
   let entrys;
   entrys = db.filter(entry=> entry.id !== id)
   console.log(entrys)
   writeToFile('./db/db.json',entrys)
   
})

module.exports = notes;