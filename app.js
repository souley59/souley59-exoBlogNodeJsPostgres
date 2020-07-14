const express = require('express');
const bodyParser = require('body-parser');
const queries = require("./app/queries/users");
const queries2 = require("./app/queries/posts");
const queries3 = require("./app/queries/comments");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/users", queries.createUser);
app.get("/users", queries.getUsers);
app.get("/users/:id", queries.getUserById);
app.put("/users/:id", queries.updateUser);
app.delete("/users/:id", queries.deleteUser);

app.post("/posts", queries2.createPost);
app.get("/posts", queries2.getPosts);
app.get("/posts/userid/:userid", queries2.getPostByuserId);
app.get("/posts/:id", queries2.getPostById);
app.put("/posts/:id", queries2.updatePost);
app.delete("/posts/:id", queries2.deletePost);

app.post("/comments", queries3.createComment);
app.get("/comments", queries3.getComments);
app.get("/comments/postid/:postid", queries3.getCommentBypostId);
app.get("/comments/:id", queries3.getCommentById);
app.put("/comments/:id", queries3.updateComment);
app.delete("/comments/:id", queries3.deleteComment);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});