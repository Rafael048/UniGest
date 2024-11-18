
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('can login table viewport', () => {
    cy.get('[name=openMenu]').click()
    cy.contains('Iniciar Sesión').click(),
      cy.get('[name="user"]').type('dasa', { force: true }, { delay: 500 }),
      cy.get('[placeholder="Contraseña"]').type('12345', { delay: 500 }),
      cy.get('[name="loginButton"]').click({ delay: 2000 }),
      cy.contains('test1').click({ delay: 1000 }),
      cy.get('#testButtonClose').click({ delay: 2000 })
    //cy.viewport(1300,768)
    //cy.contains('Iniciar Sesión').click
  })
})