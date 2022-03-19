const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees',{
    useNewurlParser: true,
})
.then(()=>console.log("Connected Successfully!!"))
.catch((e)=>console.error("Connected Failed!!"+e))

console.log("Ahmed Elsheikh");