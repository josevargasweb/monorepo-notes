import { forwardRef, useImperativeHandle, useState } from 'react'
import { PropTypes } from 'prop-types'
import i18n from '../i18n'

export const Togglable = forwardRef(({ children, buttonLabel = 'show' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = {
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div data-testid='Togglable'>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {i18n.TOGGABLE.CANCEL_BUTTON}
        </button>

      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
