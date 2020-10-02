const fs = require("fs");
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const app = express();
let newId = 1;

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  res.json(db);
  // return res.sendFile(path.join(__dirname, "db/db.json"));
});

// APP.POST
app.post("/api/notes", (req, res) => {
  try {
    const writtenNotes = req.body;
    for (i = 0; i < db.length; i++) {
      newId++;
    }
    writtenNotes.id = newId;
    db.push(req.body);
    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(db),
      function (err) {
        if (err) throw err;
      }
    );
    res.json(req.body);
  } catch (err) {
    throw err;
  }
});

app.delete("/api/notes/:id", (req, res) => {
  try {
    const currentId = db.pop(req.params.id);
    res.json(req.body);
  } catch (err) {
    throw err;
  }
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
