const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderDeliveryDate: {
    type: Date,
    default: +new Date() + 3 * 24 * 60 * 60 * 1000
  },
  orderState: {
    type: String,
    default: 'create'
  },
  customerId: String,
  productName: String,
  productId: String,
  productCount: Number,
  productPrice: Number
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
