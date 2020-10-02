const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "db/db.json"));
});

// APP.POST
app.post("/api/notes", (req, res) => {
  try {
    writtenNotes = fs.readFileSync("./db/db.json", "utf-8");
    writtenNotes = JSON.parse(writtenNotes);
    req.body.id = writtenNotes.length;
    writtenNotes.push(req.body);
    writtenNotes = JSON.stringify(writtenNotes);
    fs.writeFile("./db/db.json", writtenNotes, "utf-8", (err) => {
      if (err) throw err;
    });
    res.json(JSON.parse(writtenNotes));
  } catch (err) {
    throw err;
  }
});

app.delete("/app/notes/:id", (req, res) => {
  try {
    writtenData = fs.readFileSync("./db/db.json", "utf-8");
    writtenData = JSON.parse(writtenData);
    writtenData = writtenData.filter((note) => {
      return note.id != req.params.id;
    });
    writtenData = JSON.stringify(writtenNotes);
    fs.writeFile("./db/db.json", writtenData, "utf-8", (err) => {
      if (err) throw err;
    });
    res.send(JSON.parse(writtenNotes));
  } catch (err) {
    throw err;
  }
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
