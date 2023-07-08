import conexion from '../database/db.js'

export const guardarAlimento = (req, res) => {
  const nombre = req.body.nombre
  const precio = req.body.precio
  const categoria = req.body.categoria
  const descripcion = req.body.descripcion

  const data = {
    categoria_id_fk: categoria,
    nombre_alimento: nombre,
    foto_alimento: req.file.filename,
    precio,
    descripcion,
    estado_alimento_id_fk: 1
  }

  const action = (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/admin_a')
    }
  }

  conexion.query('INSERT INTO alimento SET ?', data, action)
}

export const editarAlimento = (req, res) => {
  const id = req.body.id
  const nombre = req.body.nombre
  const precio = req.body.precio
  const categoria = req.body.categoria
  const descripcion = req.body.descripcion

  const data = [{
    categoria_id_fk: categoria,
    nombre_alimento: nombre,
    foto_alimento: req.file.filename ?? '',
    precio,
    descripcion
  }, id]

  const action = (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/admin_a')
    }
  }
  conexion.query('UPDATE alimento SET ? WHERE alimento_id = ?', data, action)
}

export const guardarCategoria = (req, res) => {
  const menuId = req.body.id_menu
  const nombre = req.body.nombre

  const data = {
    menu_id_fk: menuId,
    nombre_categoria: nombre,
    foto_categoria: req.file.filename,
    estado_categoria_id_fk: 1
  }

  const action = (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/admin_c')
    }
  }

  conexion.query('INSERT INTO categoria SET ?', data, action)
}

export const edicionCategoria = (req, res) => {
  const id = req.body.id
  const nombre = req.body.nombre

  const data = [{
    nombre_categoria: nombre,
    foto_categoria: req.file.filename
  }, id]

  const action = (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/admin_c')
    }
  }

  conexion.query('UPDATE categoria SET ? WHERE categoria_id = ?', data, action)
}

export const registroTienda = (req, res) => {
  const correo = req.body.correo
  const pass = req.body.pass
  const nombre = req.body.nombre

  const data = { correo_menu: correo, pass_menu: pass, nombre_menu: nombre }

  const action = (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/login')
    }
  }

  conexion.query('INSERT INTO menu SET ?', data, action)
}

export const login = (req, res) => {
  const correo = req.body.correo
  const pass = req.body.pass

  if (correo && pass) {
    const query = 'SELECT * FROM menu WHERE correo_menu = ? AND pass_menu = ? '

    const data = [correo, pass]

    const action = (error, results) => {
      if (error) {
        throw error
      }

      if (results.length > 0) {
        // ENTRA
        res.render('login', {
          alert: true,
          alertTitle: 'Conexion exitosa',
          alertMessage: '¡Bienvenido! ',
          alertIcon: 'success',
          showConfirmButton: false,
          timer: 1500,
          ruta: 'admin_a',
          menu: req.session.menu = results[0]
        })
      } else {
        // NO ENTRA
        res.render('login', {
          alert: true,
          alertTitle: 'Error',
          alertMessage: 'Nombre o contraseña incorrectos!',
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'login'
        })
      }
    }
    conexion.query(query, data, action)
  }
}
