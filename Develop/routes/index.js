const express = require('express');

//const tipsRouter = require('./tips');
const notesRouter = require('./notes.js')

const app = express();

//app.use('/tips', tipsRouter);

app.use('/notes', notesRouter)

module.exports = app;