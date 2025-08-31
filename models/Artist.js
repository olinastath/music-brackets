class Artist {
	constructor(spotifyArtist) {
		this.name = spotifyArtist.name;
		this.id = spotifyArtist.id;
		this.popularity = spotifyArtist.popularity;
	}
}

module.exports = Artist;
