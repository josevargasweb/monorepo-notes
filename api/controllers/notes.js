const notesRouter = require('express').Router()
const Note = require('../models/Note.js')
const User = require('../models/User.js')
const { validateNoteToken } = require('../schemas/notes.js')
const userExtractor = require('../middleware/userExtractor.js')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(notes)
})

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).send({ error: 'note not found' })
    }
  }).catch(_error => {
    next(_error)
  })
})

notesRouter.put('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  const note = req.body
  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(note => {
    res.status(200).json(note)
  })
    .catch(_error => next(_error))
})

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  try {
    const result = validateNoteToken(req.body)

    if (!result || !result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      })
    }
    const { content, important = false } = result.data

    const { userId } = req

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        error: 'user not found'
      })
    }

    const newNote = new Note({
      content,
      important,
      date: new Date().toISOString(),
      user: user._id
    })

    const savedNote = await newNote.save()

    user.notes.push(savedNote._id)
    await user.save()

    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
