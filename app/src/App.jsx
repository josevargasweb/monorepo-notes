import { useState, useEffect } from 'react'
import './App.css'
import { noteService } from './services/notes.js'
import { login as loginService } from './services/login'
import { Notification } from './components/Notification'
import Note from './components/Note'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'

function App () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])

  useEffect(() => {
    const loggedNoteAppUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedNoteAppUser) {
      const user = JSON.parse(loggedNoteAppUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteObject) => {
    const { token } = user
    noteService
      .create(noteObject, { token })
      .then(returnedNote => {
        if (returnedNote.error) {
          setErrorMessage(returnedNote.error)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          return
        }
        setNotes(notes.concat(returnedNote))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(returnedNote => {
        if (returnedNote.error) {
          return
        }
        const updatedNotes = notes.map(note => note.id !== id ? note : returnedNote)
        setNotes(updatedNotes)
      })
      .catch(() => {
        const removedNoteContent = note.content
        setErrorMessage(`Note '${removedNoteContent}' was already removed from server`)
      })
      .finally(() => {
        setErrorMessage(null)
      })
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService({
        username,
        password
      })

      if (user.error) {
        setErrorMessage(user.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      }

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user
        ? <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
        : <LoginForm
            handleLogin={handleLogin}
          />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

    </div>
  )
}

export default App
