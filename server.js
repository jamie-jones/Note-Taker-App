const fs = require("fs");
const express = require("express");
const path = require("path");
const { isBuffer } = require("util");

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
// app.get("/api/notes", (req, res) => {
//   fs.readFile("");
//   return res.sendFile(path.join(__dirname, "db/db.json"));
// });

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        messages: "Unable to retrieve note.",
      });
    }
    res.json({
      error: false,
      data: JSON.parse(data),
      messages: "Successfully retrieved note.",
    });
  });
});

// Starts the server to begin listening

app.post("api/notes", (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.grade) {
    return res.status(400).json({
      error: true,
      data: null,
      message: "Invalid note.",
    });
  }
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve note.",
      });
    }
    const updatedData = JSON.parse(data);
    updatedData.push(req.body);
    fs.writeFile("db/db.json", JSON.stringify(updatedData), (err) => {
      if (err) {
        console.lof(err);
        return res.status(500).json({
          error: true,
          data: null,
          message: "Unable to save note.",
        });
      }
      res.json({
        error: false,
        data: updatedData,
        message: "Successfully added a new note.",
      });
    });
  });
});

// app.post("/api/notes", function (req, res) {
//   // try {
//     notesData = fs.readFileSync("./db/db.json", "utf8");
//     console.log(notesData);
//     notesData = JSON.parse(notData);
//     req.body.id = notesData.length;
//     notesData.push(req.body);
//     notesData = JSON.stringify(notesData);
//     fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
//       if (err) throw err;
//     });
//     res.json(JSON.parse(notesData));
//   // }
//   // catch (err) {
//     // throw err;
//   // }
// });

app.listen(PORT, function () {
  console.log(`Server Listening on: ${PORT}`);
});

// app.delete("/api/notes", function)
