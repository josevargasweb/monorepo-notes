const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: true,
    date: new Date()
  },
  {
    content: 'Soy el hamborgueso',
    important: true,
    date: new Date()
  },
  {
    content: 'Soy el nokas',
    important: true,
    date: new Date()
  }
]

const getAllContentFromNote = async () => {
  const response = await api.get('/api/notes')
  return {
    contest: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getAllContentFromNote,
  getUsers
}
