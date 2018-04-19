const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const blogModel = require("./models");

const blog1 = blogModel.BlogPosts.create(
  "blogpost1",
  "This is an awesome blogpost",
  "Evgeny"
);

const blog2 = blogModel.BlogPosts.create(
  "blogpost2",
  "Wow it is so interesting",
  "Andrew"
);

router.get("/", (req, res) => {
  const posts = blogModel.BlogPosts.posts;
  res.json(posts);
});

router.post("/", jsonParser, (req, res) => {
  const required = ["title", "content", "author"];
  for (let content of required) {
    if (!(content in req.body)) {
      console.error(`You have to include ${content}`);
      res.status(400).end();
    }
  }
  blogModel.BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(204).json(blogModel.BlogPosts.posts);
});

router.delete("/:id", (req, res) => {
  blogModel.BlogPosts.delete(req.params.id);
  res.send(204).end();
});

router.put("/:id", jsonParser, (req, res) => {
  for (let i = 0; i < blogModel.BlogPosts.posts.length; i++) {
    if (blogModel.BlogPosts.posts[i].id === req.params.id) {
      blogModel.BlogPosts.update({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
      });
      res.status(204).end();
    }
  }
});

module.exports = router;
