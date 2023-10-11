import { fireEvent, render } from '@testing-library/react'
import { Togglable } from './Togglable'
import '@testing-library/jest-dom/'
import i18n from '../i18n'
// import { prettyDOM } from '@testing-library/dom'

describe('<Togglable />', () => {
  const buttonLabel = 'show'
  let componente

  beforeEach(() => {
    componente = render(
      <Togglable buttonLabel={buttonLabel}>
        <div className='testDiv'>testDivContent</div>
      </Togglable>
    )
  })

  it('renders its children', () => {
    componente.getByText('testDivContent')
  })

  it('return its children but they are not visible', () => {
    const el = componente.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  it('after clicking its children must be shown', () => {
    const button = componente.getByText(buttonLabel)
    fireEvent.click(button)

    const el = componente.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  it('toggled content can be closed', () => {
    const button = componente.getByText(buttonLabel)
    fireEvent.click(button)

    const el = componente.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = componente.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})
