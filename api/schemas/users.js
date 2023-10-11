const z = require('zod')

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'User username must be a string',
    required_error: 'User username is required.'
  }),
  name: z.string({
    invalid_type_error: 'User name must be a string',
    required_error: 'User name is required.'
  }),
  password: z.string({
    invalid_type_error: 'User password must be a string',
    required_error: 'User password is required.'
  }),
  notes: z.array(z.string()).optional()
})

function validateUser (input) {
  return userSchema.safeParse(input)
}

function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}

module.exports = {
  validateUser,
  validatePartialUser
}
