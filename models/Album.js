const Artist = require('./Artist');
const Track = require('./Track');

class Album {
	constructor(spotifyAlbum) {
		this.id = spotifyAlbum.id;
		this.name = spotifyAlbum.name;
		this.releaseDate = spotifyAlbum.release_date;
		this.releaseYear = this.releaseDate.split('-')[0];
		this.totalTracks = spotifyAlbum.total_tracks;
		this.type = spotifyAlbum.type;
		this.artists = spotifyAlbum.artists.map(a => new Artist(a));
		this.mainArtist = this.artists[0];
		this.artwork = spotifyAlbum.images[0];

		if (spotifyAlbum.tracks) {
			this.tracks = spotifyAlbum.tracks.items.map(t => new Track(t));
		}

	}
}

module.exports = Album;
