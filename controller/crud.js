const conexion = require('../database/db');


exports.GuardarAlimento = (req, res) =>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;

    conexion.query('INSERT INTO alimento SET ?',{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento:"", precio: precio, descripcion:descripcion, estado_alimento_id_fk:1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
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

    conexion.query('UPDATE alimento SET ? WHERE alimento_id = ?',[{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento:"", precio: precio, descripcion:descripcion, estado_alimento_id_fk:1}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}

exports.GuardarCategoria = (req, res) =>{
    const nombre = req.body.nombre;

    conexion.query('INSERT INTO categoria SET ?',{nombre_categoria : nombre,  foto_categoria: null, estado_categoria_id_fk: 1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}

exports.EditarCategoria = (req, res) =>{
    const nombre = req.body.nombre;
    const foto = req.body.foto;

    conexion.query('UPDATE categoria SET ?',[{nombre_categoria: nombre, foto_categoria: null, estado_categoria_id_fk:1}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}