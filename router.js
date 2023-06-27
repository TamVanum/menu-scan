const express = require('express');
const conexion = require('./database/db');
const router = express.Router();



router.get('/', (req, res) =>{
    res.render('login')
})

router.get('/registro', (req, res) =>{
    res.render('registro')
})



  //admin alimentos
router.get('/admin_a', (req, res) => {

    user = req.session.menu.id_menu;

    sql_alimentos= `SELECT *
    FROM Alimento a
    JOIN Categoria c ON a.categoria_id_fk = c.categoria_id
    JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
    JOIN menu m ON c.menu_id_fk = m.id_menu
    WHERE m.id_menu = ${user};`

      conexion.query(sql_alimentos, (error, alimentos) => {
        if (error) {
          throw error;
        } else {
          res.render('admin/alimentos', { alimentos, menu: req.session.menu });
        } 
    });
  });

    //admin categorias
router.get('/admin_c', (req, res) => {

    user = req.session.menu.id_menu;

    conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ?',[user], (error, categorias) => {

        if (error) {
            throw error;
        } else {
          res.render('admin/categorias', { categorias, menu: req.session.menu });
        } 
    });
});

//admin alimentos

router.get('/crear_alimento/', (req, res) => {

    user = req.session.menu.id_menu;

    conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ?',[user], (error, categorias) => {
        if (error) {
          throw error;
        } else {
          res.render('admin/crear_alimento', { categorias:categorias , menu: req.session.menu });
        } 
    });  
});


router.get('/editar_alimento/:id', (req, res) => {

    id = req.params.id;
    user = req.session.menu.id_menu;

    sql_alimentos= `SELECT *
    FROM Alimento a
    JOIN Categoria c ON a.categoria_id_fk = c.categoria_id
    JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
    JOIN menu m ON c.menu_id_fk = m.id_menu
    WHERE m.id_menu = ${user} AND a.alimento_id = ${id};`

    conexion.query(sql_alimentos, (error, alimentos) => {
        conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ?',[user], (error, categorias) => {
            if (error) {
              throw error;
            } else {
              res.render('admin/editar_alimento', { categorias:categorias ,alimentos:alimentos[0], menu: req.session.menu });
            } 
        });
    });
});



router.get('/eliminar_alimento/:id',  (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE alimento SET estado_alimento_id_fk = 2 WHERE alimento_id = ?',[id], (error, results) => {

        if(error){
            throw error;
        }else{
            user = req.session.menu.id_menu;
            sql_alimentos= `SELECT *
            FROM Alimento a
            JOIN Categoria c ON a.categoria_id_fk = c.categoria_id
            JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
            JOIN menu m ON c.menu_id_fk = m.id_menu
            WHERE m.id_menu = ${user};`
            conexion.query(sql_alimentos, (error, alimentos) => {
            
                res.render('admin/alimentos' , {alimentos, menu: req.session.menu});
            });
        }
    });
});

router.get('/habilitar_alimento/:id',  (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE alimento SET estado_alimento_id_fk = 1 WHERE alimento_id = ?',[id], (error, results) => {

        if(error){
            throw error;
        }else{
            user = req.session.menu.id_menu;
            sql_alimentos= `SELECT *
            FROM Alimento a
            JOIN Categoria c ON a.categoria_id_fk = c.categoria_id
            JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
            JOIN menu m ON c.menu_id_fk = m.id_menu
            WHERE m.id_menu = ${user};`
            conexion.query(sql_alimentos, (error, alimentos) => {
            
                res.render('admin/alimentos' , {alimentos, menu: req.session.menu});
            });
        }
    });
});


  //admin categoria
  router.get('/crear_categoria/', (req, res) => {

    user = req.session.menu.id_menu;
    res.render('admin/crear_categoria', {menu: req.session.menu });
});


  router.get('/editar_categoria/:id', (req, res) => {

    id = req.params.id;
    user = req.session.menu.id_menu;

    conexion.query(sql_alimentos, (error, alimentos) => {
        conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ? AND categoria_id = ?',[user, id] , (error, categorias) => {
            if (error) {
              throw error;
            } else {
              res.render('admin/editar_categoria', { categorias:categorias[0], menu: req.session.menu });
            } 
        });
    });
});

router.get('/eliminar_categoria/:id',  (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE categoria SET estado_categoria_id_fk = 2 WHERE categoria_id = ?',[id], (error, results) => {

        if(error){
            throw error;
        }else{
            user = req.session.menu.id_menu;
            conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ?',[user], (error, categorias) => {
                res.render('admin/categorias' , {categorias, menu: req.session.menu});
            });
        }
    });
});

router.get('/habilitar_categoria/:id',  (req, res)=>{
    const id = req.params.id;
    conexion.query('UPDATE categoria SET estado_categoria_id_fk = 1 WHERE categoria_id = ?',[id], (error, results) => {

        if(error){
            throw error;
        }else{
            user = req.session.menu.id_menu;
            conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ?',[user], (error, categorias) => {
                res.render('admin/categorias' , {categorias, menu: req.session.menu});
            });
        }
    });
});
    

//primera vista
router.get('/carousel/', (req, res) => {

    user = req.session.menu.id_menu;

    sql_alimentos= `SELECT *
    FROM Alimento a
    JOIN estadoalimento ea ON a.estado_alimento_id_fk = ea.estado_alimento_id
    JOIN Categoria c ON a.categoria_id_fk = c.categoria_id
    JOIN estadocategoria ec ON c.estado_categoria_id_fk = ec.estado_categoria_id
    JOIN menu m ON c.menu_id_fk = m.id_menu
    WHERE m.id_menu = ${user} AND estado_alimento_id = 1 AND ec.estado_categoria_id = 1;`

    conexion.query('SELECT * from categoria JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id WHERE menu_id_fk = ? AND estado_categoria_id = 1 ',[user], (error, categorias) => {
      conexion.query(sql_alimentos, (error, alimentos) => {
        if (error) {
          throw error;
        } else {
          res.render('carousel', { categorias, alimentos, menu: req.session.menu });
        } 
      });
    });
  });






const crud = require('./controller/crud');
router.post('/GuardarAlimento', crud.GuardarAlimento);
router.post('/EditarAlimento', crud.EditarAlimento);
router.post('/GuardarCategoria', crud.GuardarCategoria);
router.post('/EdicionCategoria', crud.EdicionCategoria);
router.post('/RegistroTienda', crud.RegistroTienda);
router.post('/Login', crud.Login);


module.exports = router; 
