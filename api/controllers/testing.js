const testRouter = require('express').Router()
const Note = require('../models/Note.js')
const User = require('../models/User.js')

testRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(201).json('ok')
})

module.exports = testRouter
