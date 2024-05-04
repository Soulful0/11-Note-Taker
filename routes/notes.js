const pageRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
const dbPath = path.join(__dirname, "../db/db.json");

pageRouter.get("/", (req, res) => {
  // Reads JSON data
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

pageRouter.post("/", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Giving an ID to new notes (for delete)

  // Attempting to read the data
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote); // Pushing data to the JSON

      // Writes the data
      fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          res.status(500).send("Error writing data");
        } else {
          res.json(newNote); // Converts to JSON string for website to read
        }
      });
    }
  });
});

// Function to delete note by its id
pageRouter.delete("/:id", (req, res) => {
  // Extract the note id from the url parameter
  const noteId = req.params.id;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
    } else {
      let notes = JSON.parse(data);
      const originalLength = notes.length;
      // comparing length of notes to original length to check if it was removed
      notes = notes.filter((note) => note.id !== noteId); // Remove the note with the specified id

      // Compares the length of notes to the original length
      if (notes.length === originalLength) {
        res.status(404).send("Note not found"); // If the note is not found
      } else {
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
          if (err) {
            res.status(500).send("Error writing data");
          } else {
            // writes updated notes array to JSON file, then sends response
            res.send("Note deleted");
          }
        });
      }
    }
  });
});

module.exports = pageRouter;
