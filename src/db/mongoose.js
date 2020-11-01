const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/alversary', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
});

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
