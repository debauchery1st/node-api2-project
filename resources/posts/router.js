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
    .catch(rejection => res.status(400).json(rejection));
});

// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  DataBase.findPostComments(id)
    .then(comments => res.status(200).json(comments))
    .catch(rejection => res.status(400).json(rejection));
});

// Creates a comment for the post with the specified id using information sent inside of the `request body`.
router.post("/:id/comments", (req, res) => {
  const post_id = Number(req.params.id);
  const { text } = req.body;
  const payload = { post_id, text };
  console.log(payload);
  DataBase.insertComment(payload)
    .then(comment => res.status(200).json(comment))
    .catch(rejection => res.status(400).json(rejection));
});

//Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement
router.delete("/:id", (req, res) => {
  const postId = Number(req.params.id);
  //
  DataBase.findById(postId).then(postObject => {
    postObject &&
      DataBase.remove(postId).then(
        count =>
          (count > 0 && res.status(200).json(postObject)) ||
          res.status(500).json({
            errorMessage: "one cannot delete that which does not exist"
          })
      );
  });
  //
});

//Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
router.put("/:id", (req, res) => {
  //
});

module.exports = router;
