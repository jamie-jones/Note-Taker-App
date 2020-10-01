const fs = require("fs");
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 2000;

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
app.get("/api/notes", function (req, res) {
  return res.sendFile(path.join(__dirname, "db/db.json"));
});

// Starts the server to begin listening

app.listen(PORT, function () {
  console.log(`Server Listening on: ${PORT}`);
});

app.post("/api/notes", function (req, res) {
  // try {
    notesData = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesData);
    notesData = JSON.parse(notData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);
    fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesData));
  // } 
  // catch (err) {
    // throw err;
  // }
});

app.delete("/api/notes", function)