// const spotifyConstants = require('./constants/spotifyConstants');
const restUtils = require('./restUtils');
// const Artist = require('../models/Artist');

function sortAlbumsByArtistPopularity(albums, accessToken) {
	const promises = [];
	albums.forEach(album => {
		promises.push(restUtils.getArtistDetails(album, accessToken));
	});
	return Promise.all(promises).then(results => results.sort((a, b) => b.mainArtist.popularity - a.mainArtist.popularity));
}


/**
 * Utility for sorting Spotify results
 * @module sortingUtils
 * @type {{
 *     sortAlbumsByArtistPopularity: function,
 * }}
 */
module.exports = {
	sortAlbumsByArtistPopularity
};
