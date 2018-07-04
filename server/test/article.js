const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const app = require('../bin/www')

chai.use(chaiHttp)

describe('GET ARTICLE /article', () => {
  it('list ALL ARTICLE >> /article GET ', (done) => {
    chai.request('http://localhost:3000')
    .get('/article')
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200)
        expect(res.body.data[0]).to.have.property('article')
        expect(res.body.data[0]).to.have.property('title')
        expect(res.body.data[0].article).to.be.a('string')
        expect(res.body.data[0].title).to.be.a('string')
        done()
      })
  })
})

describe('ARTICLE CREATE /article', () => {
  it('list all Article /article/ POST' , (done) => {
    chai.request('http://localhost:3000')
      .post('/article')
      .send({
        title: 'test',
        text: 'test'
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data).to.have.property('title')
        expect(res.body.data).to.have.property('article')
        expect(res.body.data.title).to.be.a('string')
        expect(res.body.data.text).to.be.a('string')
        done()
      })
  })
})

describe('UPDATE ARTICLE /article/edit', () => {
  it('edit Article on /article/ POST', (done) => {
    chai.request('http://localhost:3000')
      .get('/article/edit')
      .end((err,res) => {
        chai.request('http://localhost:3000')
        .post(`/article/edit`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: 'wey', text: 'haha'})
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          console.log('result ===>> ',res.body);
          done()
        })
      })
  })
})

describe('DELETE SPECIFIC ARTICLE /article', () => {
  it('should remove specific Article on /article/ DELETE', (done) => {
    chai.request('http://localhost:3000')
    .get('/article')
      .end((err, res) => {
        console.log(res.body);
        chai.request('http://localhost:3000')
          .delete(`/article/${res.body.data_article[0]._id}`)
          .end((err, res) => {
            console.log(res.body);
          })
        done()
      })
  })
})
