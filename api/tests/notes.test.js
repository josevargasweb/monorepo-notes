const moongose = require('mongoose')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentFromNote } = require('./helpers')
const { server } = require('../index')

beforeEach(async () => {
  await Note.deleteMany({})

  // parallelly save notes - guarda las notas en simultaneo pero no en orden
  // const noteObjects = initialNotes.map(note => new Note(note))
  // const promises = noteObjects.map(note => note.save())
  // await Promise.all(promises)

  // secuencially save notes - guarda las notas en orden
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('Get all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('multiples notes', async () => {
    const renpose = await api.get('/api/notes')
    expect(renpose.body).toHaveLength(initialNotes.length)
  })

  test('the second note is abaout el hamborgueso', async () => {
    const { contest } = await getAllContentFromNote()

    expect(contest).toContain('Soy el hamborgueso')
  })
})

describe('POST /api/notes ', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'La emma es un hamborgueso',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { contest, response } = await getAllContentFromNote()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contest).toContain(newNote.content)
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const { response } = await getAllContentFromNote()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE /api/notes ', () => {
  test('note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNote()
    const { body: notes } = firstResponse
    const noteToBeDeleted = notes[0]

    await api
      .delete(`/api/notes/${noteToBeDeleted.id}`)
      .expect(204)

    const { contest, response: secondResponse } = await getAllContentFromNote()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

    expect(contest).not.toContain(noteToBeDeleted.content)
  })

  test('a note that do not exists can not be deleted', async () => {
    await api
      .delete('/api/notes/1234asdas')
      .expect(400)

    const { response } = await getAllContentFromNote()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  server.close()
  moongose.connection.close()
})
