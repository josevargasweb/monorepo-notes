const z = require('zod')

const noteSchema = z.object({
  content: z.string({
    invalid_type_error: 'Note content must be a string',
    required_error: 'Note content is required.'
  }),
  important: z.boolean({
    invalid_type_error: 'Note importance must be a boolean',
    required_error: 'Note importance is required.'
  }),
  date: z.date().optional(),
  userId: z.string({
    invalid_type_error: 'Note user must be a string',
    required_error: 'Note user is required.'
  })
})

const noteSchemaToken = z.object({
  content: z.string({
    invalid_type_error: 'Note content must be a string',
    required_error: 'Note content is required.'
  }),
  important: z.boolean({
    invalid_type_error: 'Note importance must be a boolean',
    required_error: 'Note importance is required.'
  }),
  date: z.date().optional()
})

function validateNote (input) {
  return noteSchema.safeParse(input)
}

function validatePartialNote (input) {
  return noteSchema.partial().safeParse(input)
}

function validateNoteToken (input) {
  return noteSchemaToken.safeParse(input)
}

function validatePartialNoteToken (input) {
  return noteSchemaToken.partial().safeParse(input)
}

module.exports = {
  validateNote,
  validatePartialNote,
  validateNoteToken,
  validatePartialNoteToken
}
