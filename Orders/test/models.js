const { expect } = require('chai')
const sinon = require('sinon')
require('sinon-mongoose')

const Order = require('../models/Order')

describe('Order Model', () => {
  it('should create a new order', (done) => {
    const orderData = {
      productName: 'PQR - Delux',
      productCount: 2,
      productPrice: 200
    }
    const OrderMock = sinon.mock(new Order(orderData))
    const order = OrderMock.object

    OrderMock
      .expects('save')
      .yields(null)

    order.save((err) => {
      OrderMock.verify()
      OrderMock.restore()
      expect(err).to.be.null
      done()
    })
  })
})
