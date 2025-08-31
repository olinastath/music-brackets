function filterUniqueAlbums(albums) {
    // TODO: compare album title, year, artists, track number, all tracks
    const uniqueAlbums = new Map();
    for (const [id, album] of albums) {
        const tempId = album.name + "-" + album.mainArtist.name + "-" + album.releaseYear + "-" + album.totalTracks;
        if (!uniqueAlbums.has(tempId)) {
            uniqueAlbums.set(tempId, album);
        }
    }

    return Array.from(uniqueAlbums.values());
}

/**
 * Utility for filtering Spotify results
 * @module filteringUtils
 * @type {{
*     filterUniqueAlbums: function,
* }}
*/
module.exports = {
    filterUniqueAlbums
}