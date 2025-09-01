const request = require('request');
const spotifyConstants = require('../constants/spotifyConstants');
// const Artist = require('../models/Artist');

function getArtistDetails(album, accessToken) {
	const options = {
		url: spotifyConstants.apiEndpoints.artistDetails + album.mainArtist.id,
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		json: true
	};
	return new Promise(resolve => {
		request.get(options, function (error, response, body) {
			album.mainArtist.popularity = body.popularity;
			resolve(album);
		});
	});
}

function getTracksDetails(tracks, accessToken) {
	const trackIds = tracks.map(track => track.id).join(',');
	const options = {
		url: spotifyConstants.apiEndpoints.trackDetails + trackIds,
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		json: true
	};
	return new Promise(resolve => {
		request.get(options, function(error, response, body) {
			resolve(body.tracks);
		});
	});
}

module.exports = {
	getArtistDetails,
	getTracksDetails
};
