const express = require('express');
const { json } = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(json)); 

app.set('view engine', 'ejs');

//Motor de plantillas
//app.set('views', path.join(__dirname,'views'));

//Permitir ver imagenes señores
//app.use(express.static(path.join(__dirname,'public')));

app.use('/', require('./router'));

app.listen(5010, ()=>{
    console.log("SERVER andando localhost:5010");
});