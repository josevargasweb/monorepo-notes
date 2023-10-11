import { useRef, useState } from 'react'
import { Togglable } from './Togglable'

export const NoteForm = ({ handleLogout, addNote }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }
    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='new note' ref={togglableRef}>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input type='text' value={newNote} onChange={handleChange} />
        <button type='submit'>save</button>
      </form>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </Togglable>
  )
}
