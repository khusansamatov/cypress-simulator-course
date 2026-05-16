/// <reference types="Cypress" />

describe("Cypress Simulator", () => {

  beforeEach(() => {
    cy.visit('./src/index.html?skipCaptcha=true', {
      onBeforeLoad(win){
        win.localStorage.setItem('cookieConsent', 'accepted')
      }
    })
    cy.contains('button', 'Login').click()
  })

  it("error: valid command without parentheses", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.visit')
    cy.contains('button', 'Run').click()

    cy.get('#outputArea', {timeout: 6000 })
      .should('contain', 'Error:')
      .and('contain', 'Missing parentheses on `cy.visit` command')
      .and('be.visible')
  })

  it("Accept cookies", () => {

  })

  it("Decline cookies", () => {

  })

  it("Captcha button states", () => {

  })

  it("Captcha error", () => {

  })

  it("checks the run button - enabled/disabled states", () => {
    
    cy.contains('button', 'Run').should('be.disabled')
    cy.get('textarea[placeholder="Write your Cypress code here..."]').type('42')
    cy.contains('button', 'Run').should('be.enabled')

    cy.get('textarea[placeholder="Write your Cypress code here..."]').clear()
    cy.contains('button', 'Run').should('be.disabled')
  })


  it('clears the code input when logging off then logging in again', () =>{
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Yay!")')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    
    //cy.visit('./src/index.html?skipCaptcha=true')
    cy.contains('button', 'Login').click()

    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .should('not.contain', 'cy.log("Yay!")')
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .should('have.value', '')
  })

  it('disables the run button  when logging off then logging in again', () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Yay!")')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    
    //cy.visit('./src/index.html?skipCaptcha=true')
    cy.contains('button', 'Login').click()

    cy.contains('button', 'Run').should('be.disabled')
  })

  it('clears the code output when logging off then logging in again', () =>{
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Yay!")')
    cy.contains('button', 'Run').click()

    cy.get('#outputArea', {timeout: 6000}).should('contain', 'Success:')
      .and('contain', 'cy.log("Yay!") // Logged message "Yay!"')
      .and('be.visible')


    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()
    
    //cy.visit('./src/index.html?skipCaptcha=true')
    cy.contains('button', 'Login').click()

    cy.get('#outputArea').should('not.contain', 'Success:')
      .and('not.contain', 'cy.log("Yay!") // Logged message "Yay!"')

  })

  it('does not show the cookie consent banner on the login page', () => {
    cy.clearAllLocalStorage()

    cy.reload()

    cy.get('#cookieConsent').should('not.be.visible')
  })
})

describe('Cypress Simulator- Cookies Consent', () =>{
  beforeEach(() =>{
    cy.visit('./src/index.html?skipCaptcha=true')
    cy.contains('button', 'Login').click()
  })

  it('declines on the cookies usage', () =>{
    cy.get('#cookieConsent')
      .as('cookieConsentBanner')
      .find('button:contains("Decline")')
      .click()

    cy.get('@cookieConsentBanner').should('not.be.visible')
    cy.window()
      .its('localStorage.cookieConsent')
      .should('be.equal', 'declined')
  })
})