const albumType = 'type=album';
const artistType = 'type=artist';
const marketQuery = 'market=US';
const albumQuery = 'q=album:';
const artistQuery = 'q=artist:';

const searchBaseApi = 'https://api.spotify.com/v1/search';
const albumDetailsBaseApi = 'https://api.spotify.com/v1/albums/';
const artistDetailsBaseApi= 'https://api.spotify.com/v1/artists/';
const trackDetailsBaseApi = 'https://api.spotify.com/v1/tracks';

const apiEndpoints = {	
	albumSearchByAlbum: `${searchBaseApi}?${albumType}&${marketQuery}&${albumQuery}`,
	albumSearchByArtist: `${searchBaseApi}?${albumType}&${marketQuery}&${artistQuery}`,
	artistSearch: `${searchBaseApi}?${artistType}&${marketQuery}`,
	albumDetails: albumDetailsBaseApi,
	artistDetails: artistDetailsBaseApi,
	trackDetails: `${trackDetailsBaseApi}?ids=`
};

module.exports = {
	apiEndpoints
};
