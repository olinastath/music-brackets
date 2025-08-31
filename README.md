# Music Brackets
A tournament bracket maker with Spotify integration that enables you to create brackets based on albums, artist discographies, or playlists. 

## Purpose
My friends and I started doing music brackets for our favorite artists about once a month, through their entire discographies, so I figured I could automate the process. 

## Running the app

### Dependencies
You will need Node.js and npm installed to run this app. Once installed, clone the repository and install its dependencies by running `npm install` on the home directory.
While this app doesn't currently support a music player, in the future it will require you to sign into your Spotify account and give permission so the Spotify Web Player SDK can be used to support the music player.

### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. You will also need to register redirect URIs for the Spotify OAuth to work. These vary based on your host. I have registered the following:

- http://localhost:3000/callback
<!-- - https://music-brackets.herokuapp.com/callback -->

Once you have created your app, create a `config.js` file on the main directory and add the following structure: 

```javascript
module.exports = {
    clientId: YOUR_CLIENT_ID,
    clientSecret: YOUR_CLIENT_SECRET,
    redirectUri: YOUR_REDIRECT_URI
};
```

This file is ignored by git as you shouldn't be sharing your client secret publicly. The application also can pick from environmental variables if you are hosting on a cloud platform such as Heroku.

In order to run the app, open the main directory, and run the start script:

    npm start

The app is now running on http://localhost:3000.

### Changing the logo colors
There is a PSD file located in `public/images/icon.psd` if you want to change the colors of the logo.

## References
* [Web API · Spotify](https://developer.spotify.com/documentation/web-api/)
* [Web Playback SDK · Spotify](https://developer.spotify.com/documentation/web-playback-sdk/)


## Addendum
Follow me on [Spotify](https://open.spotify.com/user/olina.stathopoulou?si=1a34516bbc0b476c) and [Twitter](https://twitter.com/olinastath) ☺️

<br />

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y225QO7)
