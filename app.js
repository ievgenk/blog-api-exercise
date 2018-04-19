const express = require("express");
const app = express();
const blogModel = require("./models");
const blogRouter = require("./blogRouter");

app.use("/blog-posts", blogRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
