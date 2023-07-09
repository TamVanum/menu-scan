import mysql from 'mysql'
import dotenv from 'dotenv'

const getEnv = () => {
  const { parsed, error } = dotenv.config()
  if (error) throw Error(error.message)
  return parsed
}

const credentials = getEnv()

const mysqlConfiguration = {
  host: credentials.DB_HOST ?? 'localhost',
  user: credentials.DB_USER ?? 'root',
  password: credentials.DB_PASSWORD ?? '',
  database: credentials.DB_NAME ?? 'qr_menu'
}

const mysqlIntialReport = (error) => {
  if (error) {
    console.error(`El error de conexion es: ${error}`)
    return
  }
  console.log('Conectando a la BD de menus')
}

const conexion = mysql.createConnection(mysqlConfiguration)
conexion.connect(mysqlIntialReport)

export default conexion
