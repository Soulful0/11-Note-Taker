const express = require("express");
const pages = require("./routes/pages");
const notes = require("./routes/notes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", pages);
app.use("/api", notes);

app.listen(PORT, () => {
  console.info(`Server started on localhost:${PORT}`);
});
