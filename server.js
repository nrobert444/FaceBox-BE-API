const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')
const dotenv = require('dotenv').config()
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

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})
app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profileId.getProfileById(db))

app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
