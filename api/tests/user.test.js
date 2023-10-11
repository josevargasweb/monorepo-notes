const moongose = require('mongoose')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers')
const { server } = require('../index')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'joseroot', name: 'jose', passwordHash })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const userAtStart = await getUsers()

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const userAtStart = await getUsers()

    const newUser = {
      username: 'joseroot', name: 'jose', password: 'tw1tch'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  afterAll(() => {
    server.close()
    moongose.connection.close()
  })
})
