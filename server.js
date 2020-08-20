const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'nick',
    password: '',
    database: 'face-box'
  }
})

postgres.select('*').from('users')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '456',
      name: 'Nick',
      password: 'pizza',
      email: 'Nick@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0])
  } else {
    res.status(400).json('Error logging in')
  }
})
app.post('/register', (req, res) => {
  const { email, name } = req.body

  database.users.push({
    id: '125',
    name,
    email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('User not found')
  }
})
app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('User not found')
  }
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
