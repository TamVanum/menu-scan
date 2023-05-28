const conexion = require('../database/db');


exports.GuardarAlimento = (req, res) =>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;
    
    conexion.query('INSERT INTO alimento SET ?',{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento: req.file.filename , precio: precio, descripcion:descripcion, estado_alimento_id_fk:1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log(req.file);
            res.redirect('/');
        }
    })
}

exports.EditarAlimento = (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;

    conexion.query('UPDATE alimento SET ? WHERE alimento_id = ?',[{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento: req.file.filename, precio: precio, descripcion:descripcion, estado_alimento_id_fk:1}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}

exports.GuardarCategoria = (req, res) =>{
    const nombre = req.body.nombre;

    conexion.query('INSERT INTO categoria SET ?',{nombre_categoria : nombre,  foto_categoria: req.file.filename , estado_categoria_id_fk: 1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log(req.file);
            res.redirect('/');
        }
    })
}

exports.EdicionCategoria = (req, res) =>{
    const nombre = req.body.nombre;

    conexion.query('UPDATE categoria SET ?',[{nombre_categoria: nombre, foto_categoria: req.file.filename, estado_categoria_id_fk:1}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            console.log(req.file);
            res.redirect('/');
        }
    })
}