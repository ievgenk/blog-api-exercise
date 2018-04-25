const express = require("express");
const app = express();
const blogModel = require("./models");
const blogRouter = require("./blogRouter");

app.use("/blog-posts", blogRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

//... closeServer defined here

if (require.main === module) {
  runServer().catch(err => console.error(err));
};


function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  app,
  runServer,
  closeServer
}