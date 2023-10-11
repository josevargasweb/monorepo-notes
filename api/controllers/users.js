const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User.js')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  response.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, name, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  user.save().then(savedUser => {
    res.status(201).json(savedUser)
  }).catch(error => {
    if (error.message.includes('E11000')) {
      res.status(400).json({ error: '`username` to be unique' })
    } else {
      res.status(400).json({ error: error.message })
    }
  })
})

module.exports = usersRouter
