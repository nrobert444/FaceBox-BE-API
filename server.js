const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const image = require('./controllers/image.js')
const profileId = require('./controllers/profileId.js')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'nick',
    password: '',
    database: 'face-box'
  }
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})
app.post('/signin', (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profileId.getProfileById(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
