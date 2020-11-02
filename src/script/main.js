const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();
require('../db/mongoose');
const model = require('../models/album');
const Album = model.Album;
const Bot = require('./bot');

TOKEN = process.env.TOKEN;
GRANT_TYPE = querystring.stringify({ grant_type: "client_credentials" });
TOKEN_URL = "https://accounts.spotify.com/api/token";
HEADERS = { headers: { Authorization: `Basic ${TOKEN}` } };
ENDPOINT = "https://api.spotify.com/v1/search";

let day = new Date();
let presentYear = day.getFullYear();

let presentDate = [
    day.getFullYear(),
    ('0' + (day.getMonth() + 1)).slice(-2),
    ('0' + day.getDate()).slice(-2)
  ].join('-');

let queryDate = [
    ('0' + (day.getMonth() + 1)).slice(-2),
    ('0' + day.getDate()).slice(-2)
].join('-')

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
                    'release_date': album.release_date,
                    'uri': album.external_urls.spotify,
                }
            })
            // write to DB
            albumsToSave.forEach( async (album) => {
                let albumInfo = new Album(album);
                try {
                    await albumInfo.save();
                    console.log(response);
                } catch (e) {
                    console.log(e);
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Reset Documents on New Year's Day
if (presentDate === '2020-01-01') {
    Album.deleteMany({}, function(err, result) {
        if (err) throw err;
        console.log('delete documents');
    });
}

// if no Documents in DB, get and post Data
Album.find({}, function(err, result) {
    if (err) throw err;
    if (!result.length) {
        console.log('no documents');
        getAlbums(30);
        getAlbums(40);
        getAlbums(50);
    }
}).then(() => {
    // not run on 1/1 becasue of the incomplete data.
    if (presentDate !== '2020-01-01') {
        const $regex = queryDate;
        Album.find({ release_date: { $regex }}, function(err, result) {
            if (err) throw err;
            result.forEach((album) => {
                Bot.tweet(album);
            })
        })
    }
});