const { palindrome } = require('../utils/for_testing')

test('palindrome', () => {
  const result = palindrome('jose')
  expect(result).toBe('esoj')
})

test('palindrome of empty string', () => {
  const result = palindrome()
  expect(result).toBe('')
})

test('palindrome of undefined', () => {
  // const result = palindrome()
  // expect(result).toBeUndefined()
})
