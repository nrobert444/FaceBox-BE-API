const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'nick',
    password: '',
    database: 'face-box'
  }
})

db.select('*')
  .from('users')
  .then(data => {
    console.log(data)
  })

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
  const { email, name, password } = req.body
  db('users')
    .returning('*')
    .insert({
      email,
      name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0])
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  db.select('*')
    .from('users')
    .where({
      id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('User not found')
      }
    })
    .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get count'))
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
