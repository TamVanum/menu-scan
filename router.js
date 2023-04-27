const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req,res) =>{

    conexion.query('SELECT * FROM alimento', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index',{results:results});
        }
        
    });
    

});

router.get('/intranet', (req, res) =>{
    res.render('intranet')
})


router.get('/alimentocrud', (req, res) =>{
    conexion.query('SELECT * FROM alimento', (error, results) =>{
        if(error){
            throw error;
        }else{
            res.render('alimentocrud', {results:results});
        }
    })
})

router.get('/categoriacrud', (req, res) =>{
    conexion.query('SELECT * FROM categoria', (error, results) =>{
        if(error){
            throw error;
        }else{
            res.render('categoriacrud', {results:results});
        }
    })
})


module.exports = router; 
