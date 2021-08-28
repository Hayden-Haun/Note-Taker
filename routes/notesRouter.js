const notes = require("express").Router();
const util = require("util");
const fs = require("fs");

const readFromFile = util.promisify(fs.readFile);

notes.get("/", (req, res) => {
  console.log(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;
