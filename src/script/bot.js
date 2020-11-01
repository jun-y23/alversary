const Twitter = require('twitter');
require("dotenv").config();
const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let day = new Date();
let presentYear = day.getFullYear();

/**
 * 
 * @param {*} albumInfo
 */
module.exports.tweet = function(albumInfo) {
    birth = albumInfo.release_date.slice(0,4);
    anniversaryYear = presentYear - birth;
    content = `Happy ${anniversaryYear}th Birthday, ${albumInfo.name} by ${albumInfo.artist} !! ${albumInfo.uri}`
    client.post('statuses/update', {status: content}, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
        console.log(tweet);
    });    
}