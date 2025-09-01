const express = require('express');
const session = require('express-session');
const expresshbs = require('express-handlebars');
const request = require('request');
const fs = require('fs');
const Album = require('./models/Album');
const Track = require('./models/Track');
const config = fs.existsSync('config.js') ? require('./config') : process.env;

const sortingUtils = require('./utils/sortingUtils');
const filteringUtils = require('./utils/filteringUtils');
const spotifyConstants = require('./constants/spotifyConstants');

const clientId = config.clientId; // Your client id
const clientSecret = config.clientSecret; // Your secret
let accessToken;
const db = {
	searchTerm: '',
	lastAlbum: ''
};

const app = express();

let authOptions = {
	url: 'https://accounts.spotify.com/api/token',
	headers: {
		'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
	},
	form: {
		// eslint-disable-next-line camelcase
		grant_type: 'client_credentials'
	},
	json: true
};

/**
 * This method gets a new API access token from Spotify
 * @return {String} Spotify API access_token
 */
function getSpotifyAccessToken() {
	return new Promise(resolve => {
		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// use the access token to access the Spotify Web API
				accessToken = body.access_token;
				resolve();
			}
		});
	});
}

// view engine setup
app.use(session({
	secret: Buffer.from(clientId + ':' + clientSecret).toString('base64'),
	resave: false,
	key: 'express.sid',
	saveUninitialized: false
}))
	.use(express.static(__dirname + '/public'))
	.use(express.json());

const hbs = expresshbs.create({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('views', './views/layouts');
app.set('view engine', 'hbs');

hbs.handlebars.registerHelper('join', function (values, separator) {
	return values.join(separator);
});

hbs.handlebars.registerHelper('joinArtistNames', function (values, separator) {
	const arr = [];
	for (let i = 0; i < values.length; i++) {
		arr.push(values[i].name);
	}
	return arr.join(separator);
});

/**
 * Landing page, render index.hbs view.
 */
app.get('/', (req, res) => {
	getSpotifyAccessToken().then(res.render('index'));
});

app.get('/refresh_token', function (req, res) {
	// requesting access token from refresh token
	const refreshToken = req.query.refresh_token;
	console.log(refreshToken);
	authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
		},
		form: {
			// eslint-disable-next-line camelcase
			grant_type: 'refresh_token',
			// eslint-disable-next-line camelcase
			refresh_token: refreshToken
		},
		json: true
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			const accessToken = body.access_token;
			req.session.accessToken = accessToken;
			res.send({
				// eslint-disable-next-line camelcase
				access_token: accessToken
			});
		}
	});
});


/**
 * Search by album
 */
app.get('/search', (req, res) => {
	const album = req.query.album;
	db.searchTerm = album;
	if (!accessToken) getSpotifyAccessToken();
	const options = {
		url: spotifyConstants.apiEndpoints.albumSearchByAlbum + album,
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		json: true
	};
	request.get(options, function (error, response, body) {
		let albums = new Map(body.albums.items.map(album => [album.id, new Album(album)]));
		albums = filteringUtils.filterUniqueAlbums(albums);
		sortingUtils.sortAlbumsByArtistPopularity(albums, accessToken).then(result => {
			res.render('search-response', { albums: result });
		});
		
	});


});

/**
 * Get album details
 */
app.get('/album/:id', (req, res) => {
	if (!accessToken) getSpotifyAccessToken();
	const options = {
		url: spotifyConstants.apiEndpoints.albumDetails + req.params.id,
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		json: true
	};
	request.get(options, function (error, response, body) {
		const album = new Album(body);
		db.lastAlbum = album;
		res.render('album-details', { album: album, searchUrl: '/search?album=' + db.searchTerm });
	});


});

app.get('/generate', () => {
	let tracks = db.lastAlbum.tracks;
	if (tracks != null && tracks.length > 0) {
		const totalTracks = db.lastAlbum.totalTracks;
		const logTracks = Math.log2(totalTracks);
		const isMultipleOfTwo = Number.isInteger(logTracks);
		const numOfPreliminaryRounds = totalTracks - Math.pow(2, isMultipleOfTwo ? logTracks : Math.floor(logTracks));
		const rangeAdvances = totalTracks - (2 * numOfPreliminaryRounds);
		
		sortingUtils.sortTracksByPopularity(tracks, accessToken).then(result => {
			tracks = result.map(track => new Track(track));
			const tracksToAdvance = tracks.splice(0, rangeAdvances);
			console.log(tracksToAdvance);
			console.log(tracks);
		});
	}
});

/**
 * All unregistered paths should redirect to main page.
 */
app.get('*', function (req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Server is running on port 3000');
});
