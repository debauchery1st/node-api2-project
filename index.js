require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const server = express();
const PostsRouter = require("./resources/posts/router");

const port = process.env.PORT;

server.use(express.json());

server.use(helmet());

server.use("/api/posts", PostsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to a lambda api primarily used for blogging.</p>
  `);
});

server.listen(port, () => {
  console.log(`** listening on port ${port} **`);
});
