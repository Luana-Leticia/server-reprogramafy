const express = require('express')
const router = express.Router()
const controller = require('../controllers/musicasController')

router.get('/', controller.getMusics)
router.get('/:id', controller.getMusicById)
router.get('/', controller.getArtists)

module.exports = router