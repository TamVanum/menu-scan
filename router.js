import express from 'express'
import conexion from './database/db.js'

import {
  edicionCategoria,
  editarAlimento,
  guardarAlimento,
  guardarCategoria,
  login,
  registroTienda
} from './controller/crud.js'

export const router = express.Router()

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/registro', (req, res) => {
  res.render('registro')
})

// admin alimentos
router.get('/admin_a', (req, res) => {
  const user = req.session.menu.id_menu

  const sql = `SELECT *
    FROM alimento a
    JOIN categoria c ON a.categoria_id_fk = c.categoria_id
    JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
    JOIN menu m ON c.menu_id_fk = m.id_menu
    WHERE m.id_menu = ${user};`

  const action = (error, alimentos) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    res.render('admin/alimentos', { alimentos, menu: req.session.menu })
  }

  conexion.query(sql, action)
})

// admin categorias
router.get('/admin_c', (req, res) => {
  const user = req.session.menu.id_menu

  const sql = `SELECT * 
    FROM categoria 
    JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
    WHERE menu_id_fk = ?;`

  const data = [user]

  const action = (error, categorias) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    res.render('admin/categorias', { categorias, menu: req.session.menu })
  }

  conexion.query(sql, data, action)
})

// admin alimentos

router.get('/crear_alimento/', (req, res) => {
  const user = req.session.menu.id_menu

  const sql = `SELECT * 
    FROM categoria 
    JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
    WHERE menu_id_fk = ?;`

  const data = [user]

  const action = (error, categorias) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    res.render('admin/crear_alimento', { categorias, menu: req.session.menu })
  }

  conexion.query(sql, data, action)
})

router.get('/editar_alimento/:id', (req, res) => {
  const id = req.params.id
  const user = req.session.menu.id_menu

  const sqlAlimentos = `SELECT *
    FROM alimento a
    JOIN categoria c ON a.categoria_id_fk = c.categoria_id
    JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
    JOIN menu m ON c.menu_id_fk = m.id_menu
    WHERE m.id_menu = ${user} AND a.alimento_id = ${id};`

  const actionAlimentos = (error, alimentos) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const sqlCategoria = `SELECT * 
      FROM categoria 
      JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
      WHERE menu_id_fk = ?;`

    const data = [user]

    const actionCategoria = (error, categorias) => {
      if (error) {
        console.error(error)
        res.status(500)
      }
      const items = {
        categorias,
        alimentos: alimentos[0],
        menu: req.session.menu
      }
      res.render('admin/editar_alimento', items)
    }

    conexion.query(sqlCategoria, data, actionCategoria)
  }

  conexion.query(sqlAlimentos, actionAlimentos)
})

router.get('/eliminar_alimento/:id', (req, res) => {
  const id = req.params.id

  const sqlUpdateAlimento = `UPDATE alimento 
    SET estado_alimento_id_fk = 2 
    WHERE alimento_id = ?;`

  const data = [id]

  const actionUpdate = (error, results) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const user = req.session.menu.id_menu

    const sqlAlimentos = `SELECT *
      FROM alimento a
      JOIN categoria c ON a.categoria_id_fk = c.categoria_id
      JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
      JOIN menu m ON c.menu_id_fk = m.id_menu
      WHERE m.id_menu = ${user};`

    const actionSelect = (error, alimentos) => {
      if (error) {
        console.error(error)
        res.status(500)
      }
      res.render('admin/alimentos', { alimentos, menu: req.session.menu })
    }

    conexion.query(sqlAlimentos, actionSelect)
  }

  conexion.query(sqlUpdateAlimento, data, actionUpdate)
})

router.get('/habilitar_alimento/:id', (req, res) => {
  const id = req.params.id

  const sqlUpdate = `UPDATE alimento 
    SET estado_alimento_id_fk = 1 
    WHERE alimento_id = ?;`

  const data = [id]

  const actionUpdate = (error, results) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const user = req.session.menu.id_menu

    const sqlAlimentos = `SELECT *
      FROM alimento a
      JOIN categoria c ON a.categoria_id_fk = c.categoria_id
      JOIN estadoalimento e ON a.estado_alimento_id_fk = e.estado_alimento_id
      JOIN menu m ON c.menu_id_fk = m.id_menu
      WHERE m.id_menu = ${user};`

    const actionSelect = (error, alimentos) => {
      if (error) {
        console.error(error)
        res.status(500)
      }

      res.render('admin/alimentos', { alimentos, menu: req.session.menu })
    }

    conexion.query(sqlAlimentos, actionSelect)
  }

  conexion.query(sqlUpdate, data, actionUpdate)
})

// admin categoria
router.get('/crear_categoria/', (req, res) => {
  res.render('admin/crear_categoria', { menu: req.session.menu })
})

router.get('/editar_categoria/:id', (req, res) => {
  const id = req.params.id
  const user = req.session.menu.id_menu

  const sql = `SELECT * 
    FROM categoria 
    JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
    WHERE menu_id_fk = ? AND categoria_id = ?;`

  const data = [user, id]

  const action = (error, categorias) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const items = {
      categorias: categorias[0], menu: req.session.menu
    }
    res.render('admin/editar_categoria', items)
  }

  conexion.query(sql, data, action)
})

router.get('/eliminar_categoria/:id', (req, res) => {
  const id = req.params.id

  const sqlUpdate = `UPDATE categoria 
    SET estado_categoria_id_fk = 2 
    WHERE categoria_id = ?;`

  const data = [id]

  const actionUpdate = (error, results) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const user = req.session.menu.id_menu

    const sqlCategoria = `SELECT * 
      FROM categoria 
      JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
      WHERE menu_id_fk = ?;`

    const data = [user]

    const actionSelect = (error, categorias) => {
      if (error) {
        console.error(error)
        res.status(500)
      }
      res.render('admin/categorias', { categorias, menu: req.session.menu })
    }

    conexion.query(sqlCategoria, data, actionSelect)
  }

  conexion.query(sqlUpdate, data, actionUpdate)
})

router.get('/habilitar_categoria/:id', (req, res) => {
  const id = req.params.id

  const sqlUpdate = `UPDATE categoria 
    SET estado_categoria_id_fk = 1 
    WHERE categoria_id = ?;`

  const data = [id]

  const action = (error, results) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const user = req.session.menu.id_menu

    const sqlCategoria = `SELECT * 
      FROM categoria 
      JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
      WHERE menu_id_fk = ?;`

    const data = [user]

    const actionSelect = (error, categorias) => {
      if (error) {
        console.error(error)
        res.status(500)
      }
      res.render('admin/categorias', { categorias, menu: req.session.menu })
    }

    conexion.query(sqlCategoria, data, actionSelect)
  }

  conexion.query(sqlUpdate, data, action)
})

// primera vista
router.get('/carousel/', (req, res) => {
  const user = req.session.menu.id_menu

  const sqlCategoria = `SELECT * 
    FROM categoria 
    JOIN estadocategoria ON estado_categoria_id_fk = estado_categoria_id 
    WHERE menu_id_fk = ? 
    AND estado_categoria_id = 1;`

  const data = [user]

  const actionCategoria = (error, categorias) => {
    if (error) {
      console.error(error)
      res.status(500)
    }
    const sqlAlimentos = `SELECT *
      FROM alimento a
      JOIN estadoalimento ea 
      ON a.estado_alimento_id_fk = ea.estado_alimento_id
      JOIN categoria c 
      ON a.categoria_id_fk = c.categoria_id
      JOIN estadocategoria ec 
      ON c.estado_categoria_id_fk = ec.estado_categoria_id
      JOIN menu m 
      ON c.menu_id_fk = m.id_menu
      WHERE m.id_menu = ${user} 
      AND estado_alimento_id = 1 
      AND ec.estado_categoria_id = 1;`

    const actionAlimentos = (error, alimentos) => {
      if (error) {
        console.error(error)
        res.status(500)
      }
      const items = {
        categorias,
        alimentos,
        menu: req.session.menu
      }
      res.render('carousel', items)
    }

    conexion.query(sqlAlimentos, actionAlimentos)
  }

  conexion.query(sqlCategoria, data, actionCategoria)
})

router.post('/GuardarAlimento', guardarAlimento)
router.post('/EditarAlimento', editarAlimento)
router.post('/GuardarCategoria', guardarCategoria)
router.post('/EdicionCategoria', edicionCategoria)
router.post('/RegistroTienda', registroTienda)
router.post('/login', login)
