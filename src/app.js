const express = require('express')
const app = express()
const musicsRoute = require('./routes/musicasRoute')

app.use('/', musicsRoute)

module.exports = app