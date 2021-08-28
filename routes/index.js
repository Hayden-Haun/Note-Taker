//initialize express
const express = require("express");
const app = express();

//Modular route to notesRouter.js
const notesRouter = require("./notesRouter");

//Middleware to direct to notes Router

app.use("/notes", notesRouter);

module.exports = app;
