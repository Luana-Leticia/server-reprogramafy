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

const formattedMusics2 = musics.map(music => {   
    const formattedMusic = {
        id: music.id,
        nome: music.name,
        amostra: music.preview_url,
        nome_album: music.album.name,
        imagem: music.album.url,
        artista: music.artists.name,
        duracao: music.duration_ms
    }
    return formattedMusic
})

const artists = []
musics.forEach(music => {
    const artistAlreadyAdded = artists.find(artist => artist.id == music.artists.id)
    if(!artistAlreadyAdded){
        const artist = {
            id: music.artists.id,
            nome: music.artists.name
        }
        artists.push(artist)
    }
})

const albums = []
musics.forEach(music => {
    const albumAlreadyAdded = albums.find(album => album.id == music.album.id)
    const album = {
        id: music.album.id,
        nome: music.album.name,
        data_lancamento: music.album.release_date,
        total_musicas: music.album.total_tracks,
        imagem: music.album.imagem
    }
    albums.push(album)
})

const getMusics = (request, response) => response.status(200).send(formattedMusics)

const getMusicById = (request, response) => {
    const id = request.params.id
    const music = formattedMusics.find(music => music.id == id)
    if(music){
        response.status(302).send(music)
    } else{
        response.status(404).send('Id de música não encontrado')
    }    
}

const getArtists = (request, response) => response.status(200).send(artists)

const getArtistById = (request, response) => {
    const id = request.params.id
    const artist = artists.find(artist => artist.id == id)
    if(artist){
        const musicsOfArtist = formattedMusics2.filter(music => music.artista == artist.nome)
        const artistWithMusics = {...artist, musicas: musicsOfArtist}
        response.status(302).send(artistWithMusics)
    } else {
        response.status(404).send('Id de artista não encontrado')
    }
    
}

const getAlbums = (request, response) => {
    response.status(200).send(albums)
}

const getAlbumByName = (request, response) => {
    let albumName = request.params.nome_do_album
    if (albumName.includes("-") ){
        albumName = albumName.split("-").join(" ").toLowerCase()
    }
    const album = albums.find(album => album.nome.toLowerCase() == albumName)
    if(album){
        const albumMusics = formattedMusics2.filter(music => music.nome_album.toLowerCase() == albumName)
        const albumWithMusics = {...album, musicas: albumMusics}
        response.status(302).send(albumWithMusics)
    } else {
        response.status(404).send('Id de álbum não encontrado')
    }   
}

module.exports = {
    getMusics,
    getMusicById,
    getArtists,
    getArtistById,
    getAlbums,
    getAlbumByName
}