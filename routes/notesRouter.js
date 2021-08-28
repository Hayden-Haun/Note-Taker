const notes = require("express").Router();

notes.get("/", (req, res) => {
  console.log(`${req.method} request received for notes`);
});

module.exports = notes;
