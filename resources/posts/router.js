const express = require("express");
const DataBase = require("../../data/db");
const router = express.Router();

router.get("/", (req, res) => {
  // list of posts
  res.status(200).json(DataBase.find());
});

module.exports = router;
