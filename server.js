// require modules
const express = require("express");
const path = require("path");
const apiRouter = require("./routes/index.js");

// initialize port and express server
const PORT = process.env.PORT || 3001;
const app = express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

// middleware links to public directory
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for wildcard pages, returns index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server established at http://localhost:${PORT} 🚀`)
);
