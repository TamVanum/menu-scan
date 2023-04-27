const express = require('express');
const conexion = require('./database/db');
const router = express.Router();

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

router.get('/crearalimento', (req, res) =>{
    res.render('crearalimento')
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


const crud = require('./controller/crud');
router.post('/GuardarAlimento', crud.GuardarAlimento);


module.exports = router; 
