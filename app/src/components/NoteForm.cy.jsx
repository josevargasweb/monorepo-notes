import React from 'react'
import { NoteForm } from './NoteForm'

describe('<NoteForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoteForm />)
  })
})