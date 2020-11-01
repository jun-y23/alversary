const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();
const model = require('./src/db/mongoose');
const Album = model.Album;
const Bot = require('./bot');

this.albums = [];
token = process.env.TOKEN;
GRANT_TYPE = querystring.stringify({ grant_type: "client_credentials" });
TOKEN_URL = "https://accounts.spotify.com/api/token";
HEADERS = { headers: { Authorization: `Basic ${token}` } };
ENDPOINT = "https://api.spotify.com/v1/search";

let day = new Date();
let presentYear = day.getFullYear();
let presentDate = [
    day.getFullYear(),
    ('0' + (day.getMonth() + 1)).slice(-2),
    ('0' + day.getDate()).slice(-2)
  ].join('-');
let albumsToTweet = [];

/**
 * 
 * @param {*} targetYearsAgo
 * @return array
 */
async function getAlbums(targetYearsAgo) {
    try {
        const res = await axios.post(TOKEN_URL, GRANT_TYPE, HEADERS);
        const ACCESS_TOKEN = res.data.access_token;
        for (let offset = 0; offset < 2001; offset+=50) {
            // ここは並列で走って欲しい。
            let albumRes = await axios.get(ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                params: {
                    q: `*year:${presentYear-targetYearsAgo}`,
                    type: "album",
                    limit: "50",
                    offset: offset,
                },
            })
            albumHasReleaseDate = albumRes.data.albums.items.filter((item) => {            
                return item.release_date_precision === 'day';
            });
            albumsToSave = albumHasReleaseDate.map((album) => {
                return {
                    'name': album.name,
                    'artist': album.artists[0].name,
                    'releaseDate': album.release_date,
                    'uri': album.external_urls.spotify,
                }
            })
            // write to DB
            albumsToSave.forEach(album => {
                console.log(album);
            });
        }
    } catch (error) {
        console.log('era-');
    }
}

// getAlbums(30);
// getAlbums(40);
// getAlbums(50);

// Read albums released.
Album.find({ release_date: presentDate}, function(err, result) {
    if (err) throw err;
    albumsToTweet = result;
})


// Bot!!