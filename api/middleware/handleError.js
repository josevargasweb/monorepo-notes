const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'malformatted id' }),
  ValidationError: (error, res) => res.status(400).send({ error: error.message }),
  JsonWebTokenError: res => res.status(401).send({ error: 'invalid token' }),
  TokenExpiredError: res => res.status(401).send({ error: 'token expired' }),
  default: res => res.status(500).end()
}

module.exports = (error, req, res) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.default
  console.log('error', error)
  handler(error, res)
}
