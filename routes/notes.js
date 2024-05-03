const pageRouter = require("express").Router();

pageRouter.get("/", (req, res) => {
  // res.json(db.json);
});

pageRouter.post("/", (req, res) => {
  res.send(req.body);
});

pageRouter.delete("/", (req, res) => {});

module.exports = pageRouter;
