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
  
  it("Simulate a Cypress comman (e.g., cy.log('Yay!'))", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
    .type("cy.log('Yay!')")

    cy.contains('button', 'Run').click()

    cy.get('#outputArea', {timeout: 6000})
    .should('contain', 'Success')
    .and('contain', "cy.log('Yay!')")
    .and('be.visible')
  })

  it("error: invalid command scenario", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
    .type('cy.run()')

    cy.contains('button', 'Run').click()

    cy.get('#outputArea', {timeout: 6000})
    .should('contain', 'Error:')
    .and('contain', 'Invalid Cypress command: cy.run()')
    .and('be.visible')
  })

  it("it shows a warning when entering and running a not-implemented Cypress commmand (e.g., cy.contains('Login'))", ()=> {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type("cy.contains('Login')")
    cy.contains('button', 'Run').click()

    cy.get('#outputArea', {timeout: 6000})
      .should('contain', 'Warning:')
      .and('contain', 'The `cy.contains` command has not been implemented yet.')
      .and('be.visible')

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

  it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('help')
    cy.contains('button', 'Run').click()

    cy.get('#outputArea', { timeout: 6000})
      .should('contain', 'Common Cypress commands and examples:')
      .and('contain', 'For more commands and details, visit the official Cypress API documentation.')
      .and('be.visible')
    
    cy.contains('#outputArea a', 'official Cypress API documentation')
      .should('have.attr', 'href', 'https://docs.cypress.io/api/table-of-contents')
      .and('have.attr', 'target', '_blank')
      .and('have.attr','rel', 'noopener noreferrer')
      .and('be.visible')
    })

  it('maximizes and minimizes a simulation result', () =>{
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Yay")')
    cy.contains('button', 'Run').click()

    cy.get('.expand-collapse').click()

    cy.get('#outputArea', {timeout: 6000 })
      .should('contain', 'Success')
      .and('contain', 'cy.log("Yay") // Logged message "Yay"')
      .and('be.visible')
    cy.get('#collapseIcon').should('be.visible')

    cy.get('.expand-collapse').click()

    cy.get('#expandIcon').should('be.visible')

  })

  it('log out successfully', () =>{
    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').click()

    cy.contains('button','Login').should('be.visible')
    cy.get('#sandwich-menu').should('not.be.visible')
  })

  it('show and hide logout button', () =>{
    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').should('be.visible')

    cy.get('#sandwich-menu').click()
    cy.contains('button', 'Logout').should('not.be.visible')
    
  })

  it('shows the running state before showing the final result', () =>{
    cy.get('textarea[placeholder="Write your Cypress code here..."]')
      .type('cy.log("Yay!")')
    cy.contains('button', 'Run').click()

    cy.contains('button', 'Running...')
      .should('be.disabled')
      .and('be.visible')
    cy.contains('#outputArea', 'Running... Please wait.')
    .should('be.visible')

    cy.contains('button', 'Running...', {timeout: 6000})
      .should('not.exist')
    cy.contains('button', 'Run').should('be.visible')
    cy.contains('#outputArea', 'Running... Please wait.', {timeout: 6000})
      .should('not.exist')

    cy.get('#outputArea')
      .should('contain', 'Success:')
      .and('contain', 'cy.log("Yay!") // Logged message "Yay!"')
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

  it("Reset output on logout and login", () =>{

  })

  it("No cookings banner on the login page", () =>{
    
  })
})

describe('Cypress Simulator- Cookies Consent', () =>{
  beforeEach(() =>{
    cy.visit('./src/index.html?skipCaptcha=true')
    cy.contains('button', 'Login').click()
  })

  it('consents on the cookies usage', () =>{
    cy.get('#cookieConsent')
      .as('cookieConsentBanner')
      .find('button:contains("Accept")')
      .click()

    cy.get('@cookieConsentBanner').should('not.be.visible')
    cy.window()
      .its('localStorage.cookieConsent')
      .should('be.equal', 'accepted')
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

describe('Cypress Simulator - Captcha check', () =>{

  beforeEach(() =>{
    cy.visit('./src/index.html')
    cy.contains('button', 'Login').click()
  })

  it('disables the captcha verify button when no answer is provided or it is cleared button check', () =>{
    
    cy.get('#verifyCaptcha').should('be.disabled')

    cy.get('#captchaInput').type(42)
    cy.get('#verifyCaptcha').should('be.enabled')

    cy.get('#captchaInput').clear()
    cy.get('#verifyCaptcha').should('be.disabled')
  })

  it('shows an error on a wrong captcha answer and goes back to its initial state', () =>{

    cy.contains('button', 'Verify').should('be.disabled')
    
    cy.get('input[placeholder="Enter your answer"]').type(42)
    cy.contains('button', 'Verify').should('be.enabled')
    cy.contains('button', 'Verify').click()

    //cy.get('#captchaError').should('have.text', 'Incorrect answer, please try again.')
    cy.contains('#captchaError', 'Incorrect answer, please try again.').should('be.visible')
    cy.get('input[placeholder="Enter your answer"]').should('have.value', '')

    cy.contains('button', 'Verify').should('be.disabled')
  })
})