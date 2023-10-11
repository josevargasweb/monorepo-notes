import { useState } from 'react'
import { Togglable } from './Togglable'
import { PropTypes } from 'prop-types'

export const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel='show login'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='username'
            placeholder='username'
            onChange={handleUsername}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='password'
            placeholder='password'
            onChange={handlePassword}
          />
        </div>
        <button>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.prototype = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
