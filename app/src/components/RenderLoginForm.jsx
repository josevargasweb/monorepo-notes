export const RenderLoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='username'
          placeholder='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='password'
          placeholder='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  )
}
