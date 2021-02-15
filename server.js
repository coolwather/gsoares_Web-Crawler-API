// INCLUDES
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')

// DOTENV
require('dotenv').config()

// START APP
const app = express()

// ENVIRONMENT
const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV

// SEQUELIZE
const db = require('./config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

// CONFIGURATIONS
if (environment !== 'production') app.use(morgan('dev'))
app.use(cors())
app.disable('x-powered-by')
app.use(compression())

// SETUP BODY PARSER
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }))
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }))

// MODELS
require('./models')

// ROUTES
app.use('/', require('./routers'))

// 404 ROUTE
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

// ROUTE - 422 500 501
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    if(err.status !== 404) console.log('Error: ', err.message, new Date())
    res.json(err)
})

// LISTEN
app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server listen on port ${port}`)
})
