const mongoose = require("mongoose");

mongoose.connect('mongodb://mongodb:27017', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "alversary"
})
.then(() => console.log('success!'))
.catch(() => console.log('error'))
;