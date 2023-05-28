const express = require('express');
const { json } = require('express');
const path = require('path');
const multer = require('multer');
const { v4 : uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(json)); 

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file , cb) =>{
        cb(null, uuidv4() + '.jpg');
    }
});

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img')
}).single('image'));



//Motor de plantillas
app.set('views', path.join(__dirname,'views'));

//Permitir ver imagenes señores
app.use(express.static(path.join(__dirname,'public')));

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log("SERVER andando localhost:5000");
});