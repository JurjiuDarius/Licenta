describe('Diagnostic', () => {
  context('Allows doctor to edit diagnostic', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Allows doctor to edit diagnostic', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/users/doctor-patients/*', {
        fixture: 'return-patients.json',
      }).as('patients');
      cy.intercept('GET', 'http://localhost:5000/images/user-images-all/*', {
        fixture: 'return-images.json',
      }).as('images');
      cy.intercept('GET', 'http://localhost:5000/diagnostic/*', {
        fixture: 'diagnostic.json',
      }).as('diagnostic');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('Images').click();
      cy.get('mat-select').contains('Select a patient').click();
      cy.get('mat-option').contains('test').click();
      cy.get('mat-card').should('be.visible');
      cy.get('span').contains('open_in_new').click();
      cy.get('img').should('be.visible');
      cy.get('button').contains('Open diagnostic').click();
      cy.wait('@diagnostic');
      cy.get('textarea').should('be.visible');
    });
  });

  context('Shows patient diagnostic', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
    it('Shows patient diagnostic', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/images/user-images/*', {
        fixture: 'return-images.json',
      }).as('images');
      cy.intercept('GET', 'http://localhost:5000/diagnostic/*', {
        fixture: 'diagnostic.json',
      }).as('diagnostic');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('My Images').click();
      cy.wait('@images');
      cy.get('img').should('be.visible');
      cy.get('span').contains('open_in_new').first().click();
      cy.get('textarea').should('be.visible');
    });
  });
});
