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

module.exports = {
	getArtistDetails
};
