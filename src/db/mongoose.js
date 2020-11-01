const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://mongodb:27017', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "alversary"
})
.then(() => console.log('success!'))
.catch(() => console.log('error'))
;

const albumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    uri: {
        type: String,
        required: true,
    }
})

exports.Album = mongoose.model('Album', albumSchema);
