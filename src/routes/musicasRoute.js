const express = require('express')
const router = express.Router()
const controller = require('../controllers/musicasController')

router.get('/musicas', controller.getMusics)
router.get('/musicas/:id', controller.getMusicById)
router.get('/artistas', controller.getArtists)
router.get('/artistas/:id', controller.getArtistById)
router.get('/albuns', controller.getAlbums)
router.get('/albuns/:nome_do_album', controller.getAlbumByName)

module.exports = router