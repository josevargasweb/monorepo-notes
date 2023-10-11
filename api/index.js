require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

const corsOptions = {
  origin: (origin, callback) => {
    const ACCEPTED_ORIGIN = [
      'http://localhost:8080',
      'http://localhost:3001',
      'http://localhost:5173'
    ]

    if (ACCEPTED_ORIGIN.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}

app.use(cors(corsOptions))

app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use(express.json())

app.use(express.static('../app/dist'))

app.use(logger)



app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing.js')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)

app.use(handleError)

const PORT = process.env.PORT || process.env.LOCALPORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

module.exports = { app, server }
