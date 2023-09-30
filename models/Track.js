class Track {
	constructor(spotifyTrack) {
		this.name = spotifyTrack.name;
		this.trackNumber = spotifyTrack.track_number;
		this.id = spotifyTrack.id;
	}
}

module.exports = Track;
