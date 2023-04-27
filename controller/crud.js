const conexion = require('../database/db');


exports.GuardarAlimento = (req, res) =>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;
    console.log(nombre + precio + categoria + descripcion);

    conexion.query('INSERT INTO alimento SET ?',{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento:"", precio: precio, descripcion:descripcion, estado_alimento_id_fk:1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}