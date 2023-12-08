const mongoose = require('mongoose');

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connection establish');
}).catch((err)=>{
    console.log('connection error'+err);
})