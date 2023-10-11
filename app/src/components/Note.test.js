import { fireEvent, render } from '@testing-library/react'
import Note from './Note'
import '@testing-library/jest-dom/'
// import { prettyDOM } from '@testing-library/dom'

test('render content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  component.getByText('This is a test')
  component.getByText('make not important')
})

test('clicking the button calls event handler one', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
