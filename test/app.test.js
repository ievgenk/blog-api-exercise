const chai = require('chai');
const chaiHttp = require('chai-http')
const expect = chai.expect
const {
  app,
  runServer,
  closeServer
} = require('../app')

chai.use(chaiHttp);

describe('Testing blog endpoints for GET,POST,PUT,DELETE', function () {

  before(function () {
    return runServer();
  })

  after(function () {
    return closeServer();
  })


  it('should retrieve all blogpost upo GET request', function () {

    return chai.request(app)
      .get('/blog-posts')
      .then(function (response) {
        expect(response).to.have.status(200)
        expect(response).to.be.json
      })
  })

  it('should add a blogpost upon getting a POST request', function () {
    const blogItem = {
      title: "Best Blog",
      content: "This is great",
      author: "Alex"
    }
    return chai.request(app)
      .post('/blog-posts')
      .send(blogItem)
      .then(function (response) {
        expect(response).to.have.status(204)
        expect(response.body).to.be.a('object')
      })
  })

  it('should delete a blogpost with a given id', function () {
    return chai.request(app)
      .get('/blog-posts')
      .then(function (response) {
        expect(response).to.have.status(200)
        expect(response.body).to.be.a('array')
        return chai.request(app)
          .delete(`/blog-posts/${response.body[0].id}`)
      })
      .then(function (response) {
        expect(response).to.have.status(204)
      })
  })


  it('should update a give blogpost when gettin a PUT request', function () {
    return chai.request(app)
      .get('/blog-posts')
      .then(function (response) {
        const updatedBlog = {

          title: "Updated blog",
          content: "It has been updated",
          author: "Alex"

        }
        expect(response).to.have.status(200)
        expect(response.body).to.be.a('array')
        updatedBlog.id = response.body[0].id
        return chai.request(app)
          .put(`/blog-posts/${response.body[0].id}`)
          .send(updatedBlog)
      })
      .then(function (response) {
        expect(response).to.have.status(204)
      })
  })

})