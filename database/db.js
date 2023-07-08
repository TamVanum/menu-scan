const mysql = require('mysql');
const dotenv = require('dotenv');

const getEnv = () => {
    const { parsed, error } = dotenv.config()
    if (error) throw Error(error.message)
    return parsed
}

const credentials = getEnv()

const conexion = mysql.createConnection({
    host: credentials.DB_HOST ?? 'localhost',
    user: credentials.DB_USER ?? 'root',
    password: credentials.DB_PASSWORD ?? '',
    database: credentials.DB_NAME ?? 'qr_menu',
})

conexion.connect((error) => {
    if (error) {
        console.error('El error de conexion es: ' + error);
        return
    }
    console.log('Conectando a la BD de menus')
})

module.exports = conexion;