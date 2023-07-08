const express = require('express');
const { json } = require('express');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config({
  path: '.env'
})

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express(json));

app.set('view engine', 'ejs');


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    let uploadPath = '';
    if (req.body.formType === 'alimentos') {
      uploadPath = path.join(__dirname, 'public/img/alimentos');
    } else if (req.body.formType === 'categorias') {
      uploadPath = path.join(__dirname, 'public/img/categorias');
    }
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(multer({
  storage,
}).single('image'));

//Motor de plantillas
app.set('views', path.join(__dirname, 'views'));

//Permitir ver imagenes señores
app.use(express.static(path.join(__dirname, 'public')));

//Sessions
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));


app.use('/', require('./router'));


module.exports = app;

app.listen(5000, () => {
  console.log("SERVER andando http://localhost:5000");
});