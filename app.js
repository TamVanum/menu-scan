const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/', require('./router'));

app.listen(5010, ()=>{
    console.log("SERVER andando localhost:5010");
});