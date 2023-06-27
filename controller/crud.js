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
            res.redirect('/admin_a');
        }
    })
}

exports.EditarAlimento = (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;

    conexion.query('UPDATE alimento SET ? WHERE alimento_id = ?',[{categoria_id_fk: categoria, nombre_alimento:nombre, foto_alimento: req.file.filename, precio: precio, descripcion:descripcion}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/admin_a');
        }
    })
}

exports.GuardarCategoria = (req, res) =>{

    const menu_id = req.body.id_menu;
    const nombre = req.body.nombre;

    conexion.query('INSERT INTO categoria SET ?',{menu_id_fk: menu_id , nombre_categoria : nombre,  foto_categoria: req.file.filename , estado_categoria_id_fk: 1}, (error, results)=>{
        if(error){
            console.log(error);
        }else{

            res.redirect('/admin_c');
        }
    })
}

exports.EdicionCategoria = (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;

    conexion.query('UPDATE categoria SET ? WHERE categoria_id = ?',[{nombre_categoria: nombre, foto_categoria: req.file.filename}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{

            res.redirect('/admin_c');
        }
    })
}

exports.RegistroTienda = (req, res) =>{
    
    const correo = req.body.correo;
    const pass = req.body.pass;
    const nombre = req.body.nombre;
    
    conexion.query('INSERT INTO menu SET ?',{correo_menu :correo, pass_menu:pass, nombre_menu: nombre}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/login');
        }
    })
}

exports.Login = (req, res)=>{
    const correo = req.body.correo;
    const pass = req.body.pass;

    if(correo && pass){
        conexion.query('SELECT * FROM menu WHERE correo_menu = ? AND pass_menu = ? ', [correo, pass], (error, results)=>{
            
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '¡Bienvenido! ',
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'admin_a',
                        menu: req.session.menu = results[0]
                    })
                }else{
                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }
            }
        })
    }
}
