const express = require('express')
const app = express()
const musicsRoute = require('./routes/musicasRoute')

app.use('/musicas', musicsRoute)

module.exports = app