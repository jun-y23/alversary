const mongodb = require("mongodb");
const assert = require("assert");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "alversary";

MongoClient.connect(
    connectionURL,
    (error, client) => {
        if (error) {
            console.log("Unable to connect to database");
        }
        const db = client.db(databaseName);
    }
);
