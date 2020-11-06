const mongoose = require("mongoose");

mongoose.connect('mongodb://ec2-54-150-50-94.ap-northeast-1.compute.amazonaws.com:27017', { 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    ssl: true,
    sslValidate: false,
    // sslCA: fs.readFileSync(''),
    user: 'admin',
    pass: 'manager',
    dbName: "alversary"
})
.then(() => console.log('success!'))
.catch((response) => console.log(response))
;