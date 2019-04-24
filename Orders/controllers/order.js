const Order = require('../models/Order')

/**
 * POST /order
 * Create order
 */
exports.create = (req, res, next) => {
  const newOrder = new Order({
    customerId: 'default',
    productId: req.body.productId,
    productName: req.body.productName,
    productCount: req.body.productCount,
    productPrice: req.body.productPrice
  })

  newOrder.save((err, order) => {
    if (err) {
      req.flash('errors', { msg: 'Some error with order creation.' })
      return next(err)
    }
    req.flash('success', { msg: 'Your order created please proceed to make payment.' })
    res.redirect('/orderState/' + order._id)
  })
}

/**
 * GET /orderState:id
 * Order status
 */
exports.status = (req, res, next) => {
  const orderId = req.params.id
  const details = req.params.details

  Order.findById(orderId, (err, data) => {
    if (err) {
      req.flash('error', { msg: 'Some error to fetch order status.' })
      return next(err)
    }
    if (details != undefined) {
      res.send(data)
    } else {
      req.flash('info', { msg: 'Your order status.' })
      res.render('status', data)
    }
  })
}

/**
 * GET /orderUpdate:state
 * Update state
 */
exports.update = (req, res, next) => {
  const orderId = req.params.id
  const state = req.params.state

  if (state == 'confirmed') {
    function deliver (arg) {
      Order.findOneAndUpdate({_id: orderId}, {$set: {orderState: arg}}, (err, data) => {
        console.log(err)
      })
    }
    req.flash('info', { msg: 'Please check status after 5 second, for delivery status.' })
    setTimeout(deliver, 8000, 'delivered')
  }

  Order.findOneAndUpdate({_id: orderId}, {$set: {orderState: state}}, (err, data) => {
    if (err) {
      req.flash('errors', { msg: `Some error with order ${state}.` })
      return next(err)
    }
    req.flash('success', { msg: `Your order ${state} now.` })
    res.redirect('/orderState/' + orderId)
  })
}
