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
  newNote.id = uuidv4(); // Giving an ID to new notes

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
          res.json(newNote); // Converts to JSON string
        }
      });
    }
  });
});

app.delete("/:id", (req, res) => {});

module.exports = pageRouter;
