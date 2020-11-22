const mongoose = require("mongoose");

mongoose.connect('mongodb://10.0.2.10:27017', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "alversary"
})
.then(() => console.log('success!'))
.catch((response) => console.log(response))
;