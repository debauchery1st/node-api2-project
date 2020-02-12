const express = require("express");
const server = express();
const PostsRouter = require("./resources/posts/router");
const PORT = 5001;
server.use(express.json());

server.use("/api/posts", PostsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog API</h>
    <p>Welcome to a lambda api primarily used for blogging.</p>
  `);
});

server.listen(PORT, () => {
  console.log(`** listening on port ${PORT} **`);
});
