const musics = require('../models/musicas.json')

const formattedMusics = musics.map(music => {   
    const formattedMusic = {
        id: music.id,
        nome: music.name,
        amostra: music.preview_url,
        nome_album: music.album.name,
        imagem: music.album.url,
        artista: music.artists.name
    }
    return formattedMusic
})

const artists = musics.map(music => music.artists)

const getMusics = (request, response) => {  
    response.status(200).send(formattedMusics)
}

const getMusicById = (request, response) => {
    const id = request.params.id
    const formattedMusic = formattedMusics.find(music => music.id == id)
    if(formattedMusic){
        response.status(302).send(formattedMusic)
    } else{
        response.status(404).send('Id não encontrado')
    }    
}

const getArtists = (request, response) => {
    response.status(200).send(artists)
}

module.exports = {
    getMusics,
    getMusicById,
    getArtists
}