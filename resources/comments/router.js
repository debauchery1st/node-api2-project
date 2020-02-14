const express = require("express");
const DataBase = require("../../data/db");
const router = express.Router();

// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  console.log(req);
  DataBase.findPostComments(id)
    .then(comments => res.status(200).json(comments))
    .catch(rejection => res.status(400).json(rejection));
});

// Creates a comment for the post with the specified id using information sent inside of the `request body`.
router.post("/:id/comments", (req, res) => {
  const post_id = Number(req.params.id);
  DataBase.findById(post_id)
    .then(op => {
      if (!op) {
        console.log("bad find");
      }
      const { text } = req.body;
      const payload = { post_id, text };
      console.log(payload);
      DataBase.insertComment(payload)
        .then(comment => res.status(200).json(comment))
        .catch(rejection => res.status(400).json(rejection));
    })
    .catch(rejection =>
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    );
});

module.exports = router;
