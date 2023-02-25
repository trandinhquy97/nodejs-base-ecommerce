require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

console.log(`Process::`, process.env);

// init middlewares
app.use(morgan("dev")) // To show request on console log ("combined", "common", "short", "tiny", "dev")
app.use(helmet()) // Prevent third page read information from our page
app.use(compression()) // Reduce size of input and output data


// init db
require('./dbs/init.mongodb')

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello Fantipjs'
    return res.status(500).json({
        message: 'Welcome to JS',
        metadata: strCompress.repeat(10000)
    })
})

// handling error

module.exports = app