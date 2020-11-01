const mongodb = require("mongodb");
// const index = require("./index.js");
const assert = require("assert");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "alversary";

MongoClient.connect(
    connectionURL,
    { useNewURLParser: true },
    (error, client) => {
        if (error) {
            console.log("Unable to connect to database");
        }
        const db = client.db(databaseName);
        db.collection('albums').insertOne({
            name: 'Extreme II: Pornograffitti (Deluxe)',
            artist: 'Extreme',
            release_date: '1990-08-07',
            uri: 'https://open.spotify.com/album/4bQ3DhbAEU6zhWFRhDNF3r'
        })
    }
);
