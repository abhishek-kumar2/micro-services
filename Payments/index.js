/**
 * Module dependencies.
 */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const compression = require('compression')
const session = require('express-session')
const flash = require('express-flash')
const errorHandler = require('errorhandler')

/**
 * Controllers
 */
const paymentController = require('./controllers/payment')

/**
 * Create Express server.
 */
const app = express()

/**
 * Connect to MongoDB Docker
 */
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://abhi_sam_m:abhiSam1@cluster0-nekdx.mongodb.net/samPayments?retryWrites=true', {useNewUrlParser: true}, () => {
  console.log('Database is connected!!!')
})
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err)
  process.exit()
})

/**
 * Express configuration.
 */
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}))

app.get('/payment/:orderId', paymentController.payment)
app.get('/doPayment/:orderId', paymentController.doPayment)

/**
 * Error Handler.
 */
app.use(errorHandler())

app.listen(4000, () => {
  console.log('server up and running on port 4000')
})
