const express = require("express");
const DataBase = require("../../data/db");
const router = express.Router();

// Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
  DataBase.find().then(posts => res.status(200).json(posts));
});

// Creates a post using the information sent inside the `request body`
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  title && contents
    ? DataBase.insert({ title, contents }).then(created =>
        DataBase.findById(created.id).then(newPost =>
          res.status(201).json(newPost)
        )
      )
    : res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      }) && req.destroy();
});

// Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  DataBase.findById(id)
    .then(foundPost => res.status(200).json(foundPost))
    .catch(rejection => {
      console.log(rejection);
      res.status(400).json(rejection);
    });
});

module.exports = router;
