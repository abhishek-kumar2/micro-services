const request = require('supertest')
const app = require('../index')

describe('GET /', () => {
  it('should return 200 OK', done => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

describe('POST /order', () => {
  it('should return 302 redirection', done => {
    let order = {
      productName: 'PQR - Delux',
      productCount: 2,
      productPrice: 200
    }
    request(app)
      .post('/order')
      .send(order)
      .expect(302, done)
  })
})

describe('GET /orderState/<existing order id>', () => {
  it('should return 200 OK', done => {
    request(app)
      .get('/orderState/5ca367ba0c22051fc93bbdce')
      .expect(200, done)
  })
})

describe('GET /orderState/<dummy Order Id>', () => {
  it('should return 404 not found', done => {
    request(app)
      .get('/orderStatus/dummyOrderId')
      .expect(404, done)
  })
})

describe('GET /orderState/<existing order id>/true', () => {
  it('should return 200 OK', done => {
    request(app)
      .get('/orderState/5ca367ba0c22051fc93bbdce/true')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
