// set up express router and require modules
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const data = require("../db/db.json");

//define 4 helper functions: readFromFile(), writeToFile(), readAndAppend(), uuid()
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
const readAndDelete = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const indexDeleted = parsedData.findIndex((x) => x.id === content);
      parsedData.splice(indexDeleted, 1);
      writeToFile(file, parsedData);
    }
  });
};
//generates a unique ID
const uuid = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

notes.get("/", (req, res) => {
  console.log(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(`${req.method} request received for notes`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

notes.delete("/*", (req, res) => {
  console.log(`${req.method} request received for notes`);
  console.info(req.params[0]);

  const deletedNote = req.params[0];
  readAndDelete(deletedNote, "./db/db.json");
  res.json("Note deleted");
});

// notes.delete("/:id", (req, res) => {
//   console.log(`${req.method} request received for notes`);
//   const note_id = req.params.note_id;
//   console.log(note_id);
//   //   if (currentNote){
//   //     for (let i=0; i < data.length )
//   //   }
// });

module.exports = notes;
