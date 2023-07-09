import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import multer from 'multer'
import session from 'express-session'
import dotenv from 'dotenv'

import { router } from './router.js'

// Configs
dotenv.config({
  path: '.env'
})

const findFolder = () => {
  const currentFileUrl = import.meta.url
  const currentFilePath = fileURLToPath(currentFileUrl)
  const currentDirectory = dirname(currentFilePath)
  return currentDirectory
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = ''
    if (req.body.formType === 'alimentos') {
      uploadPath = join(findFolder(), 'public/img/alimentos')
    } else if (req.body.formType === 'categorias') {
      uploadPath = join(findFolder(), 'public/img/categorias')
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// App iniatilization
const app = express()

app.set('view engine', 'ejs')
app.set('views', join(findFolder(), 'views'))

app.use(express.static(join(findFolder(), 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(multer({ storage }).single('image'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Routes
app.use('/', router)

export default { app }

app.listen(5000, () => {
  console.log('SERVER andando http://localhost:5000')
})
